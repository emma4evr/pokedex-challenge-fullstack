import React, {Component} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'

import {loadState, saveState} from '../../helpers/stateHelpers'
import PokemonCard from '../PokemonCard'
import SearchBox from '../SearchBox'
import MultipleSelect from '../MultipleSelect'
import Checkbox from '../Checkbox'

import './style.css'

const types = [
  "Bug",
  "Dragon",
  "Electric",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Water"
]


export default class HomePage extends Component {
  state = {
    pokemon: [],
    searchTerm: '',
    typeFilters: [],
    weaknessFilters: [],
    strictType: false
  }

  componentWillMount = async () => {
    try {
      const result = await axios.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      const typeFilters = loadState('type')
      const weaknessFilters = loadState('weakness')
      const strictType = loadState('strictType')

      this.setState({
        pokemon: result.data.pokemon,
        typeFilters,
        weaknessFilters,
        strictType
      })
    } catch (error) {
      console.error('There was a problem fetching data: ', error)
    }
  }

  handleSearchEvent = term => {
    this.setState({searchTerm: term})
  }

  handleTypeChange = (data) => {
    this.setState({typeFilters: data}, () => saveState('type', data))
  }

  handleWeaknessChange = (data) => {
    this.setState({weaknessFilters: data}, () => saveState('weakness', data))
  }

  handleStrictTypeChange = (data) => {
    this.setState({strictType: data}, () => saveState('strictType', data))
  }

  handleClearType = () => {
    this.handleTypeChange([]);
    this.handleStrictTypeChange(false);
  }

  render() {
    const {pokemon, searchTerm, typeFilters, strictType, weaknessFilters} = this.state
    console.log('HomePage searchTerm: ', searchTerm)
    return (
      <div className="Container">
        <h1>Original Pokedex</h1>
        <SearchBox handleSearchEvent={this.handleSearchEvent} items={pokemon} />
        <div className="FilterContainer">
          <div className="TypeFilterContainer">
            <MultipleSelect
              options={types}
              label="Types"
              handleChange={this.handleTypeChange}
              value={typeFilters}
            />
            <div className="CheckboxContainer">
              <Checkbox
                label="Strict Type Match"
                checked={strictType}
                handleChange={this.handleStrictTypeChange}
              />
            </div>
            <MultipleSelect
              options={types}
              label="Weaknesses"
              handleChange={this.handleWeaknessChange}
              value={weaknessFilters}
            />
          </div>
          <div className="ButtonContainer">
            <Button onClick={this.handleClearType}>Clear Type Filter</Button>
            <Button onClick={() => this.handleWeaknessChange([])}>Clear Weakness Filter</Button>
          </div>
        </div>
        <div className="CardContainer">
          {pokemon
            .filter(poke => searchTerm ? poke.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
            .filter(poke => {
              if (typeFilters.length) {
                if (strictType) {
                  return typeFilters.every(t => poke.type.includes(t))
                }
                return poke.type.some(t => typeFilters.includes(t))
              }
              return true
            })
            .filter(poke => (
              weaknessFilters.length ? poke.weaknesses.some(t => weaknessFilters.includes(t)) : true
            ))
            .map(poke => <PokemonCard pokemon={poke} key={poke.num} />)
          }
        </div>
      </div>
    );
  }
}
