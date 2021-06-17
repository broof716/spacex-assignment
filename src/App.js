import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

function GetLaunches() {
  const { loading, error, data } = useQuery(gql`
    {
      launchesPast(limit: 10) {
        mission_name
        links {
          video_link
          flickr_images
        }
        details
      }
    }
  `);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launchesPast.map((launch) => (
    <div className="spacex">
      <div className="container">
        <div className="card bg-danger">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body" key={launch.id}>
                  <h4 className="card-title">{launch.mission_name}</h4>
                  <img
                    className="card-img"
                    className="center"
                    src={launch.links.flickr_images}
                    alt=""
                  />
                  <a
                    href={launch.links.video_link}
                    className="btn btn-secondary streched-link"
                    style={{
                      display: "block",
                      padding: "10px",
                    }}
                  >
                    SpaceX Video Link
                  </a>
                  <p className="card-title">{launch.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        SpaceX Launches
      </h1>
      <GetLaunches />
    </ApolloProvider>
  );
}

export default App;
