export class UserInfo {
    constructor({nameSelector, aboutSelector}){
        this._nameInput = document.querySelector(nameSelector);
        this._jobInput = document.querySelector(aboutSelector);
    }

    getUserInfo() { //возвращает объект с данными пользователя 
       
       //const inputName = document.querySelector('.popup__input_description_name');
       //const inputProfession = document.querySelector('.popup__input_description_profession')
       const profileInfo = {
        profileName: this._nameInput.textContent,
        profileProfession: this._jobInput.textContent
};
       return profileInfo;
    }

    setUserInfo({name, profession}) { //принимает новые данные пользователя и добавляет их на страницу
       this._nameInput.textContent = name;
       this._jobInput.textContent = profession;
    }
}