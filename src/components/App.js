import React from "react";

class App extends React.Component {
  state = {
    playlist: [
      {
        name: "King of the road",
        artist: "Roger Miller",
        addedBy: "Clare",
        addedToSpotify: false,
        seenByGandD: false
      },
      {
        name: "Do you love me (now that I can dance)?",
        artist: "The Sonics",
        addedBy: "Steve",
        addedToSpotify: false,
        seenByGandD: false
      }
    ]
  };
  render() {
    return (
      <div id="wrapper">
        <header />
        <Heading />
        <SongAdder addSong={this.addSong} />
        <Playlist playlist={this.state.playlist} />
        <footer />
      </div>
    );
  }
  addSong = songToAdd => {
    const newSong = {
      name: songToAdd.name,
      artist: songToAdd.artist,
      addedBy: songToAdd.addedBy,
      addedToSpotify: false,
      seenByGandD: false
    };
    this.setState({
      playlist: [newSong, ...this.state.playlist]
    });
  };
}

function Heading() {
  return (
    <div id="title">
      <h1>Playlist for the big day...</h1>
    </div>
  );
}

class SongAdder extends React.Component {
  state = {
    newSong: {
      name: "",
      artist: "",
      addedBy: ""
    }
  };

  render() {
    return (
      <nav id="addSong">
        <p>Add a song you would like to hear at the wedding:</p>
        <label htmlFor="name">Song name</label>
        <input
          id="name"
          type="text"
          value={this.state.newSong.name}
          onKeyUp={this.changeBox}
          onChange={this.onChange}
          placeholder="Add your song name here..."
        />
        <label htmlFor="artist">Artist</label>
        <input
          id="artist"
          type="text"
          value={this.state.newSong.artist}
          onKeyUp={this.changeBox}
          onChange={this.onChange}
          placeholder="Add the singer or group name here..."
        />
        <label htmlFor="addedBy">Your name</label>
        <input
          id="addedBy"
          type="text"
          value={this.state.newSong.addedBy}
          onKeyUp={this.changeBox}
          onChange={this.onChange}
          placeholder="Add your name here..."
        />
        <button className="add" onClick={this.handleClick}>
          Add song
        </button>
      </nav>
    );
  }

  onChange = event => {
    const key = event.target.id;
    if (key === "name") {
      this.setState({
        newSong: { ...this.state.newSong, name: event.target.value }
      });
    }
    if (key === "artist") {
      this.setState({
        newSong: { ...this.state.newSong, artist: event.target.value }
      });
    }
    if (key === "addedBy") {
      this.setState({
        newSong: { ...this.state.newSong, addedBy: event.target.value }
      });
    }
  };

  changeBox = event => {
    if (event.key === "Enter") {
      event.target.nextSibling.focus();
    }
  };

  handleClick = () => {
    this.props.addSong(this.state.newSong);
    this.setState({
      newSong: {
        name: "",
        artist: "",
        addedBy: ""
      }
    });
  };
}

function Playlist({ playlist }) {
  return (
    <nav id="playlist">
      <p>Recently added...</p>
      <table>
        <th>Song name</th>
        <th>Artist</th>
        {playlist
          .map((songInfo, i) => {
            return <Song songInfo={songInfo} key={i} />;
          })
          .filter((song, i) => i < 6)}
      </table>
    </nav>
  );
}

function Song({ songInfo }) {
  return (
    <tr>
      <td>{songInfo.name}</td>
      <td>{songInfo.artist}</td>
    </tr>
  );
}

export default App;
