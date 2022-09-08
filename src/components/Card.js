export class Card {
  constructor({data, userId,  handleCardClick, handleDeleteUsersCard, handleLikeClick, handleRemoveLike}, cardSelector) {
    this._link = data.link;
    this._name =  data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; 
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteUsersCard = handleDeleteUsersCard;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._idOwner = data.owner._id;
  
   // this._isLiked = isLiked
  }

  _getTemplate() {
    return this._cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector("#item")
      .cloneNode(true);

   // return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._photo = this._element.querySelector(".gallery__illustration");
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._title = this._element.querySelector(".gallery__title");
    this._title.textContent = this._name;
    this._likesNumber = this._element.querySelector(".gallery__like_number");
   this._likesNumber.textContent = this._likes.length;
   
   
   this._btnLike = this._element.querySelector(".button_view_like")
  this._btnDelete = this._element.querySelector(".button_view_trash")
this._isLiked();
   this._setEventListeners();
  this._hasDelete()
  
   return this._element;
 
  }

  deleteCard(evt) {
    this._element.remove(evt);
    this._element = null;
  }

  _isLiked() {
  if (this._likes.some((user) => {
    return this._userId === user._id;
  })) {
    this._element.querySelector('.button_view_like').classList.add('button_view_like-active')
    
  }
  }

handleLikeCard() {
 //
 this._likesNumber = this._element.querySelector(".gallery__like_number")
//
  this._btnLike.classList.toggle('button_view_like-active')
   this._likes.length = this._likesNumber.textContent;

   
 console.log(this._likes.length)
}

  _hasDelete(){
    if (this._userId !== this._idOwner){
      this._btnDelete.remove()
    }
  }

  _setEventListeners() {
    this._btnDelete.addEventListener("click", () => {
        this._handleDeleteUsersCard(this._cardId);
      })
      
      this._btnLike.addEventListener("click", () => {
        if (this._btnLike.classList.contains('button_view_like-active')) {
        this._handleRemoveLike(this._cardId,  this._cardElement, this._isLiked(), this);
        this._likesNumber.textContent--;
      } else {
        this._handleLikeClick(this._cardId,  this._cardElement, this._isLiked(), this);
        this._likesNumber.textContent++;
      }
      })

      this._photo.addEventListener("click", () => {
   this._handleCardClick(this._link, this._name)
  })
  }
}
