import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Card } from "antd";

const CardPage = ({ peopleData }) => {
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);

  const cardId = useLocation().pathname.slice(1);
  const specificCard = peopleData.find(
    (person) => person.name === decodeURI(cardId)
  );

  const getFilms = useCallback(async () => {
    let promises = [];
    let films = [];
    if (specificCard) {
      for (let film of specificCard.films) {
        promises.push(
          await axios.get(film).then((response) => {
            films.push(response.data.episode_id);
          })
        );
      }
      Promise.all(promises).then(() => setFilms(films));
    }
  }, [specificCard]);

  const getStarships = useCallback(async () => {
    let promises = [];
    let starships = [];
    if (specificCard) {
      for (let starship of specificCard.starships) {
        promises.push(
          await axios.get(starship).then((response) => {
            starships.push(response.data.name);
          })
        );
      }
      Promise.all(promises).then(() => setStarships(starships));
    }
  }, [specificCard]);

  useEffect(() => {
    getFilms();
    getStarships();
  }, [peopleData, getFilms, getStarships]);

  return (
    <div>
      {specificCard ? (
        <>
          <div style={{ marginBottom: "30px" }}>
            <p className="homepage-text">
              <Link to="/" className="breadcrumb">
                <HomeOutlined /> All Cards {"/"}&nbsp;
              </Link>
              &nbsp;
              <UserOutlined />
              &nbsp;
              <span className="header-text-span">{specificCard.name}</span>
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              title={specificCard.name}
              bordered={false}
              style={{
                width: 350,
              }}
              extra={<Link to={"/"}>Back</Link>}
            >
              <h3>Species:</h3>
              <div className="card-info-main">
                <div className="info-box">
                  <p className="info-header-text">Species</p>
                  <p className="info-value-text">{specificCard.species}</p>
                </div>
              </div>

              <div>
                <h3>Spaceships are:</h3>
                {specificCard.starships.length > 0 ? (
                  starships.map((starship) => (
                    <div className="info-box-individual" key={starship}>
                      <p className="info-header-text">Spaceships</p>
                      <p className="info-value-text">{starship}</p>
                    </div>
                  ))
                ) : (
                  <div className="info-box-individual">
                    <p className="info-header-text">Spaceships </p>
                    <p className="info-value-text">None</p>
                  </div>
                )}
              </div>
              <div>
                <h3>Episodes are:</h3>
                {specificCard.films.length > 0 ? (
                  films.map((film) => (
                    <div className="info-box-individual" key={film}>
                      <p className="info-header-text">Epsiode</p>
                      <p className="info-value-text">{film}</p>
                    </div>
                  ))
                ) : (
                  <div className="info-box-individual">
                    <p className="info-header-text">Epsiode</p>
                    <p className="info-value-text">None</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </>
      ) : (
        <p className="load-text">
          Loading data...
          <br />
          <br />
          Or, info is not available.
        </p>
      )}
    </div>
  );
};

export default CardPage;
