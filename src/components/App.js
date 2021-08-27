import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCards] = React.useState({isOpen: false});

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

  return (
  <div className="page">
    <Header /> 
    <Main 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick} 
      onEditAvatar={handleEditAvatarClick} 
      onCardClick={handleCardClick}/>
    <Footer />
    <PopupWithForm
      title = "Редактировать профиль"
      name = "editProfile"
      buttonText = "Сохранить"
      isOpen = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}>
          <label htmlFor="name-input" className="popup__label"> 
            <input type="text" className="popup__input popup__input_string_name" id="name-input" placeholder="Ваше имя" name="name" minLength="2" maxLength="40" required /> 
            <span className="popup__error" id="name-input-error"></span> 
          </label> 
          <label htmlFor="subheading-input" className="popup__label"> 
            <input type="text" className="popup__input popup__input_string_subheading" id="subheading-input" placeholder="Краткое описание профиля" name="about" minLength="2" maxLength="200" required /> 
            <span className="popup__error" id="subheading-input-error"></span> 
          </label> 
    </PopupWithForm>
    <PopupWithForm
      title = "Новое место"
      name = "addProfile"
      buttonText = "Создать"
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}>
          <label htmlFor="title-input" className="popup__label"> 
            <input type="text" className="popup__input popup__input_string_title" id="title-input" placeholder="Название" name="title" minLength="2" maxLength="30" required /> 
            <span className="popup__error" id="title-input-error"></span> 
          </label> 
          <label htmlFor="link-input" className="popup__label"> 
            <input type="url" className="popup__input popup__input_string_link" id="link-input" placeholder="Ссылка на фотографию" name="link" required /> 
            <span className="popup__error" id="link-input-error"></span> 
          </label> 
      </PopupWithForm>
      <PopupWithForm
        title ="Обновить Аватар"
        name = "avatarlink"
        buttonText = "Сохранить"
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}>
          <label htmlFor="link-input" className="popup__label"> 
            <input type="url" className="popup__input popup__input_string_link-avatar" id="link-input-avatar" placeholder="Ссылка на аватар" name="link" required /> 
            <span className="popup__error" id="link-input-avatar-error"></span> 
          </label> 
      </PopupWithForm>
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
    );}

export default App;
