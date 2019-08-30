import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

import './style.css'

const PokemonCard = (props) => {
  const {pokemon} = props

  return (
    <div>
      <Card className="PokeCard">
        <CardMedia className="PokeCard_media" image={pokemon.img} title={pokemon.name} />
        <CardContent className="PokeCard_content">
          <Typography variant="h5" component="h2">
            {pokemon.name}
          </Typography>
          <Typography variant="subtitle1">
            #{pokemon.num}
          </Typography>
          <Typography variant="subtitle1">
            Type
                <div className="types">
              {pokemon.type.map(t => (
                <Chip size="small" label={t} className="Green" />
              ))}
            </div>
          </Typography>
          <Typography variant="subtitle1">
            Weaknesses
                <div className="types">
              {pokemon.weaknesses.map(t => (
                <Chip size="small" label={t} className="Green" />
              ))}
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default PokemonCard
