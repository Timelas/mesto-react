import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCards] = React.useState({isOpen: false});
  const [currentUser , setCurrentUser ] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(()  => {
    api.getInitialCards()
        .then(data => {
            setCards(data)
        })
        .catch((err) => {
            console.log(err)
        });
  }, [])

React.useEffect(() => {
  api.getUserInfo()
  .then(data => {
      setCurrentUser(data);
  })
  .catch((err) => {
      console.log(err);
  })
  }, []) 
  
  function handleEditAvatarClick () {
      setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick () {
      setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick () {
      setIsAddPlacePopupOpen(true)
  }

  function handleCardClick({name, link, isOpen}) {
      setSelectedCards({name, link, isOpen: !isOpen})
  }

  function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCards({isOpen: false});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
        const newCards = cards.filter((elem) => elem !== card);
        setCards(newCards)
    })
  }

function handleUpdateUser({name, about}) {
  api.editProfile(name, about)
  .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
  })
  .catch((err) =>{
      console.log(err)
  })
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar)
    .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
    }) 
    .catch((err) => {
        console.log(err)
    })
  }

  function handleAddPlaceSubmit({name,link}) {
    api.addNewCard(name,link)

    .then((data) => {
        setCards([data, ...cards])
        closeAllPopups()
    })
    .catch((err) => {
        console.log(err)
    })
  } 

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header /> 
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick} 
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}/>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} /> 
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
      <PopupWithForm
        title="Вы уверены?"
        name="removeCard"
        buttonText="Да"
        onClose={closeAllPopups}>        
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}/>
    </div>
  </CurrentUserContext.Provider>
);}

export default App;
