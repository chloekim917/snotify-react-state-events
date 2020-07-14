import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
// import SongList from './components/SongList'
// import SongItem from './components/SongItem'

let API_ENDPOINT = `http://localhost:6001/songs`

class App extends React.Component {
  state = {
    /* TODO: What should go in state here?? Anything we don't want to have to fetch again for instance...? */
    songs: []
  }

  getAllSongs = () => {
    fetch(API_ENDPOINT)
    .then(resp => resp.json())
    .then(data=> {
      this.setState({songs:data})
    })
  }

  handleUpdateFavorite = (id, favorite) =>{
    fetch(`http://localhost:6001/songs/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
            Accept: 'appication/json'
        },
        body: JSON.stringify({
            favorite: !favorite
        })
    })
    .then(resp=> resp.json())
    .then(data => {
        console.log(data)
        let targetSongIndex = this.state.songs.findIndex(song => song.id ===data.id)
        let copySongs = [...this.state.songs]
        copySongs[targetSongIndex] = data
        this.setState({songs: copySongs})
    })
}
  
  renderNav = () => {
    return (
      <div className="simple-flex-row">
        <button onClick={this.getAllSongs}>Get Songs</button> 
        <h1>S-not-ify 🐽</h1>
        <input placeholder="Search by title or artist..."/>
      </div>
    )
  }

  render(){
    return (
      <div className="App">
        {this.renderNav()} {/** The renderNav method renders a div holding the button to get songs and the title */}
        <MainContainer songs={this.state.songs} handleUpdateFavorite={this.handleUpdateFavorite}/> {/** TODO: What props do I need? */}
      </div>
    );
  }
}

export default App;
