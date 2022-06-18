import { useState, useEffect } from 'react';
import CardList from './Components/card-list/card-list.component';
import SearchBox from './Components/searchbar/search-box.component';
import './App.css';

const App = () => {

  const [ searchField, setSearchField] = useState('');
  const [ title, setTitle] = useState('');
  const [ monsters, setMonsters] = useState([]);
  const [ filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    console.log(event.target.value);
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString)
  }

  const onTitleChange = (event) => {
    console.log(event.target.value);
    const searchFieldString = event.target.value.toLowerCase();
    setTitle(searchFieldString)
  }


  return (
    <div className = "App">
      <h1 className="app-title">{title}</h1>
        <SearchBox 
          className = 'monster-search-box' 
          onChangeHandler = {onSearchChange} 
          placeholder = 'search monsters'
         />
         <br />
        <SearchBox 
          className = 'monster-search-box' 
          onChangeHandler = {onTitleChange} 
          placeholder = 'set title'
         />
        <CardList monsters = {filteredMonsters} />
      </div>
  )
}

 export default App;
