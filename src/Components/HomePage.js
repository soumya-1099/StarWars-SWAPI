import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { HomeOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";

const HomePage = ({ peopleData }) => {
  const [search, setSearch] = useState("");

  const [peopleData2, setPeopleData2] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await axios
      .get(`https://swapi.dev/api/people/?search=${search}`)
      .then((response) => {
        var peopleCopy = response.data.results;
        let promises = [];
        for (let person of peopleCopy) {
          promises.push(
            axios.get(person.homeworld).then((response) => {
              person.homeworld = response.data.name;
            }),
            person.species.length > 0
              ? axios.get(person.species[0]).then((response) => {
                  person.species = response.data.name;
                })
              : (person.species = "Human")
          );
        }
        Promise.all(promises).then(() => {
          setPeopleData2(peopleCopy);
        });
      })
      .catch((error) => {
        alert("error loading data");
      });
  };

  useEffect(() => {
    setPeopleData2(peopleData);
  }, [peopleData]);

  return (
    <>
      <div style={{ marginBottom: "80px" }}>
        <p className="homepage-text">
          <HomeOutlined /> All Cards {"/"}&nbsp;
          <UserOutlined />&nbsp;
          <span >Select a card below</span>
        </p>

        <div className="main-search-box">
          <form onSubmit={handleSearch}>
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Enter a character"
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchOutlined
                style={{ color: "#000", fontSize: "18px" }}
                onClick={handleSearch}
              />
            </div>
          </form>
        </div>

        <div style={{ margin: "1rem" }} className="card-container">
          {peopleData2.length > 0 ? (
            peopleData2.map((person) => (
              <Card
                title={person.name}
                bordered={false}
                style={{
                  width: 300,
                }}
                extra={<Link to={`/${person.name}`}>View Details</Link>}
              >
                <div className="card-info-main">
                  <div className="info-box">
                    <p className="info-header-text">Name</p>
                    <p className="info-value-text">{person.name}</p>
                  </div>
                  <div className="info-box">
                    <p className="info-header-text">Species</p>
                    <p className="info-value-text">{person.species}</p>
                  </div>
                  <div className="info-box">
                    <p className="info-header-text">Gender</p>
                    <p className="info-value-text">{person.gender}</p>
                  </div>
                  <div className="info-box">
                    <p className="info-header-text">Movies</p>
                    <p className="info-value-text">{person.films.length}</p>
                  </div>
                  <div className="info-box">
                    <p className="info-header-text">SPACESHIPS</p>
                    <p className="info-value-text">{person.starships.length}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="load-text">
              Loading data...
              <br />
              <br />
              Or, info is not available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
