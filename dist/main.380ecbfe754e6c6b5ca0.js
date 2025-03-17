/*! For license information please see main.380ecbfe754e6c6b5ca0.js.LICENSE.txt */
"use strict";(self.webpackChunktripleten=self.webpackChunktripleten||[]).push([["main"],{"./src/components/Card.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Card)\n/* harmony export */ });\nfunction _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }\nfunction _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }\nvar Card = /*#__PURE__*/function () {\n  function Card(data, templateSelector, handleImageClick) {\n    _classCallCheck(this, Card);\n    this._data = data;\n    this._template = document.querySelector(templateSelector).content;\n    this._handleImageClick = handleImageClick;\n  }\n  return _createClass(Card, [{\n    key: "_getTemplate",\n    value: function _getTemplate() {\n      var cardElement = this._template.cloneNode(true);\n      this._cardElement = cardElement;\n      this._cardImage = cardElement.querySelector(".cards__image");\n      this._cardTitle = cardElement.querySelector(".cards__title");\n      this._deleteButton = cardElement.querySelector(".cards__delete-button");\n      this._heartButton = cardElement.querySelector(".cards__heart");\n      return cardElement;\n    }\n  }, {\n    key: "_setEventListeners",\n    value: function _setEventListeners() {\n      var _this = this;\n      this._deleteButton.addEventListener("click", function (event) {\n        event.stopPropagation();\n        var card = _this._deleteButton.closest(".cards__card");\n        if (card) {\n          card.remove();\n        }\n      });\n      this._heartButton.addEventListener("click", function () {\n        _this._handleHeartButton(_this._heartButton);\n      });\n      this._cardImage.addEventListener("click", function () {\n        _this._handleImageClick(_this._data);\n      });\n    }\n  }, {\n    key: "generateCard",\n    value: function generateCard() {\n      this._getTemplate();\n      this._setEventListeners();\n      this._cardImage.src = this._data.link;\n      this._cardImage.alt = this._data.name;\n      this._cardTitle.textContent = this._data.name;\n      return this._cardElement;\n    }\n  }, {\n    key: "getElement",\n    value: function getElement() {\n      return this.generateCard();\n    }\n  }, {\n    key: "_handleHeartButton",\n    value: function _handleHeartButton(heartButton) {\n      heartButton.classList.toggle("cards__heart_active");\n    }\n  }]);\n}();\n\n\n//# sourceURL=webpack://tripleten/./src/components/Card.js?')},"./src/components/FormValidator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FormValidator: () => (/* binding */ FormValidator)\n/* harmony export */ });\nfunction _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }\nfunction _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }\nvar FormValidator = /*#__PURE__*/function () {\n  function FormValidator(settings, formElement) {\n    _classCallCheck(this, FormValidator);\n    console.log("FormValidator initialized with form:", formElement.id);\n    this._settings = settings;\n    this._formElement = formElement;\n    this._inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));\n    this._submitButton = formElement.querySelector(settings.saveButtonSelector);\n  }\n  return _createClass(FormValidator, [{\n    key: "_checkInputValidity",\n    value: function _checkInputValidity(inputElement) {\n      var errorElement = this._formElement.querySelector("#".concat(inputElement.id, "-error"));\n      if (inputElement.validity.valid) {\n        this._hideInputError(inputElement, errorElement);\n      } else {\n        this._showInputError(inputElement, errorElement);\n      }\n    }\n  }, {\n    key: "_showInputError",\n    value: function _showInputError(inputElement, errorElement) {\n      errorElement.textContent = inputElement.validationMessage;\n      inputElement.classList.add(this._settings.inputErrorClass);\n      errorElement.classList.add(this._settings.errorClass);\n    }\n  }, {\n    key: "_hideInputError",\n    value: function _hideInputError(inputElement, errorElement) {\n      errorElement.textContent = "";\n      inputElement.classList.remove(this._settings.inputErrorClass);\n      errorElement.classList.remove(this._settings.errorClass);\n    }\n  }, {\n    key: "toggleSubmitButtonState",\n    value: function toggleSubmitButtonState() {\n      var isValid = this._inputs.every(function (input) {\n        return input.validity.valid;\n      });\n      console.log("Form validity state:", isValid, "for form:", this._formElement.id);\n      if (isValid) {\n        this._submitButton.disabled = false;\n        this._submitButton.classList.remove(this._settings.inactiveButtonClass);\n      } else {\n        this._submitButton.disabled = true;\n        this._submitButton.classList.add(this._settings.inactiveButtonClass);\n      }\n    }\n  }, {\n    key: "_setEventListeners",\n    value: function _setEventListeners() {\n      var _this = this;\n      this._inputs.forEach(function (inputElement) {\n        inputElement.addEventListener("input", function () {\n          _this._checkInputValidity(inputElement);\n          _this.toggleSubmitButtonState();\n        });\n      });\n    }\n  }, {\n    key: "enableValidation",\n    value: function enableValidation() {\n      console.log("Form validation enabled for:", this._formElement.id);\n      this._setEventListeners();\n      this.toggleSubmitButtonState();\n    }\n  }, {\n    key: "resetValidation",\n    value: function resetValidation() {\n      var _this2 = this;\n      this._inputs.forEach(function (inputElement) {\n        _this2._hideInputError(inputElement, _this2._formElement.querySelector("#".concat(inputElement.id, "-error")));\n      });\n      this.toggleSubmitButtonState();\n    }\n  }]);\n}();\n\n//# sourceURL=webpack://tripleten/./src/components/FormValidator.js?')},"./src/images/jacques-cousteau.jpg":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = __webpack_require__.p + "assets/8ec5e3f3631a809fd255.jpg";\n\n//# sourceURL=webpack://tripleten/./src/images/jacques-cousteau.jpg?')},"./src/images/logo.svg":(module,__unused_webpack_exports,__webpack_require__)=>{eval('module.exports = __webpack_require__.p + "assets/4e8e0a1d604782a0dff8.svg";\n\n//# sourceURL=webpack://tripleten/./src/images/logo.svg?')},"./src/pages/index.css":(module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      (function() {\n        var localsJsonString = undefined;\n        // 1742249482902\n        var cssReload = __webpack_require__(/*! ../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {});\n        // only invalidate when locals change\n        if (\n          module.hot.data &&\n          module.hot.data.value &&\n          module.hot.data.value !== localsJsonString\n        ) {\n          module.hot.invalidate();\n        } else {\n          module.hot.accept();\n        }\n        module.hot.dispose(function(data) {\n          data.value = localsJsonString;\n          cssReload();\n        });\n      })();\n    }\n  \n\n//# sourceURL=webpack://tripleten/./src/pages/index.css?')},"./src/pages/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ "./src/pages/index.css");\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");\n/* harmony import */ var _images_logo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/logo.svg */ "./src/images/logo.svg");\n/* harmony import */ var _images_jacques_cousteau_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/jacques-cousteau.jpg */ "./src/images/jacques-cousteau.jpg");\nconsole.log("Starting the index.js file...");\n\n\n\n\n\ndocument.querySelector(".header__logo").src = _images_logo_svg__WEBPACK_IMPORTED_MODULE_3__;\ndocument.querySelector(".profile__image").src = _images_jacques_cousteau_jpg__WEBPACK_IMPORTED_MODULE_4__;\nvar validationConfig = {\n  formSelector: ".modal__form",\n  inputSelector: ".modal__input",\n  saveButtonSelector: ".modal__save-button",\n  inactiveButtonClass: "modal__save-button_disabled",\n  inputErrorClass: "modal__input-type-error",\n  errorClass: "modal__input-error_visible"\n};\nvar cardData = [{\n  name: "Yosemite Valley",\n  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",\n  alt: "Yosemite Valley"\n}, {\n  name: "Lake Louise",\n  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",\n  alt: "Lake Louise"\n}, {\n  name: "Bald Mountains",\n  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",\n  alt: "Bald Mountains"\n}, {\n  name: "Latemar",\n  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",\n  alt: "Latemar"\n}, {\n  name: "Vanoise National Park",\n  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",\n  alt: "Vanoise National Park"\n}, {\n  name: "Lago di Braies",\n  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",\n  alt: "Lago di Braies"\n}];\nvar cardsContainer = document.querySelector("#cards-container");\nvar addModal = document.getElementById("add-modal");\nvar addForm = document.forms["add-form"];\nvar titleInput = addForm.querySelector("#place");\nvar urlInput = addForm.querySelector("#link");\nvar editModal = document.getElementById("edit-modal");\nvar nameInput = document.querySelector("#name");\nvar aboutInput = document.querySelector("#about");\nvar profileName = document.querySelector(".profile__name");\nvar profileAbout = document.querySelector(".profile__about");\nvar openAddModalButton = document.querySelector(".profile__add-button");\nvar openEditModalButton = document.querySelector(".profile__edit-button");\nvar modalImage = document.querySelector(".modal__image");\nvar modalCaption = document.querySelector(".modal__caption");\nvar previewImageModal = document.querySelector("#image-modal");\nfunction handleImageClick(data) {\n  modalImage.src = data.link;\n  modalImage.alt = data.name;\n  modalCaption.textContent = data.name;\n  openModal(previewImageModal);\n}\nopenEditModalButton.addEventListener("click", function () {\n  nameInput.value = profileName.textContent;\n  aboutInput.value = profileAbout.textContent;\n  openModal(editModal);\n});\nvar formValidators = {};\nfunction enableValidation(config) {\n  var formList = Array.from(document.querySelectorAll(config.formSelector));\n  formList.forEach(function (formElement) {\n    var validator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.FormValidator(config, formElement);\n    var formName = formElement.getAttribute("name");\n    formValidators[formName] = validator;\n    validator.enableValidation();\n  });\n}\nenableValidation(validationConfig);\naddForm.addEventListener("submit", function (e) {\n  e.preventDefault();\n  var newCardData = {\n    name: titleInput.value,\n    link: urlInput.value,\n    alt: titleInput.value\n  };\n  var cardElement = createCard(newCardData);\n  cardsContainer.prepend(cardElement);\n  addForm.reset();\n  formValidators["card-form"].toggleSubmitButtonState();\n  closeModal(addModal);\n});\ndocument.querySelector("#edit-form").addEventListener("submit", function (e) {\n  e.preventDefault();\n  profileName.textContent = nameInput.value;\n  profileAbout.textContent = aboutInput.value;\n  closeModal(editModal);\n});\nfunction closeModal(modalEl) {\n  modalEl.classList.remove("modal_open");\n  modalEl.classList.add("modal_hidden");\n  document.removeEventListener("keydown", handleEscapeClose);\n  if (modalEl === addModal) {\n    addForm.reset();\n  } else if (modalEl === editModal) {}\n}\nfunction openModal(modal) {\n  modal.classList.remove("modal_hidden");\n  modal.classList.add("modal_open");\n  document.addEventListener("keydown", handleEscapeClose);\n}\nfunction handleEscapeClose(e) {\n  if (e.key === "Escape") {\n    var _openModal = document.querySelector(".modal_open");\n    if (_openModal) {\n      closeModal(_openModal);\n    }\n  }\n}\nfunction createCard(item) {\n  var newCard = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__["default"](item, "#card-template", handleImageClick);\n  return newCard.getElement();\n}\ncardData.forEach(function (card) {\n  var cardElement = createCard(card);\n  cardsContainer.append(cardElement);\n});\nopenAddModalButton.addEventListener("click", function () {\n  openModal(addModal);\n});\ndocument.querySelectorAll(".modal__close-button").forEach(function (button) {\n  button.addEventListener("click", function () {\n    var modal = button.closest(".modal");\n    closeModal(modal);\n  });\n});\ndocument.querySelectorAll(".modal").forEach(function (modal) {\n  modal.addEventListener("click", function (e) {\n    if (e.target === modal) {\n      closeModal(modal);\n    }\n  });\n});\nconsole.log(" index.js File Loaded");\n\n//# sourceURL=webpack://tripleten/./src/pages/index.js?')}},e=>{var n=n=>e(e.s=n);e.O(0,["vendors"],(()=>(n("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&reconnect=10"),n("./node_modules/webpack/hot/dev-server.js"),n("./src/pages/index.js"))));e.O()}]);