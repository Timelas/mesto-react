import React from 'react'

function Card(props) {
    
    function handleClick() {
        props.onCardClick(props.card);
      }  

    return (
      <template className="elements-template"> 
        <li className="element"> 
          <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/> 
          <button type="button" className="element__delete"></button> 
            <div className="element__group"> 
              <h2 className="element__text">{props.card.name}</h2> 
              <div className="element__heart"> 
                <button type="button" className="element__like"></button> 
                <p className="element__amount">{props.card.likes.length}</p> 
            </div> 
          </div> 
        </li> 
      </template>
    )
}

export default Card;