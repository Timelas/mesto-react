import React from 'react';
import editButton from '../images/edit-button.png';
import buttonPlus from '../images/+.svg';
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const {onEditAvatar, onAddPlace, onEditProfile, onCardClick} = props;

  React.useEffect(() => {
      api.getUserInfo()
      .then((value) => {
        setUserName(value.name)
        setUserDescription(value.about)
        setUserAvatar(value.avatar)  
      })
      .catch((error) => {
        console.log(error)
      })
      api.getInitialCards()
        .then(cardList => {
            setCards(cardList)
        })
        .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <> 
    <section className="profile"> 
      <div className="profile__information"> 
        <div className="profile__container"> 
          <img src={`${userAvatar}`} alt="Аватар" className="profile__avatar" /> 
          <button className="profile__avatar-edit" onClick={onEditAvatar}></button> 
        </div> 
        <div className="profile__info"> 
          <h1 className="profile__name">{userName}</h1> 
          <button className="profile__edit-button" type="button" onClick={onEditProfile}><img src={editButton} alt="редактировать" className="profile__image-button" aria-label="Редактировать профиль" /></button> 
          <p className="profile__description">{userDescription}</p> 
        </div> 
      </div> 
     <button className="profile__add-button" type="button" onClick={onAddPlace}> <img src={buttonPlus} alt="добавить" className="profile__plus" aria-label="Добавить карточку" /></button> 
    </section> 
    <section className="elements"> 
      <ul className="elements__list">
      {cards.map(card => (<Card key={card._id} card={card} onCardClick={onCardClick} />))}
      </ul> 
    </section> 
  </> 
  );
}

export default Main; 