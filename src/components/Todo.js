// components/Todo.js
class Todo {
  constructor(data, selector) {
    if (!data || !data.title || !data.description) {
      throw new Error(
        'Invalid data object. "title" and "description" are required.'
      );
    }

    this.data = {
      ...data,
      isComplete: data.isComplete || false,
    };

    this.selector = selector;
  }

  getView() {
    const template = document.querySelector(this.selector);
    if (!template) {
      throw new Error(`Template not found with selector: ${this.selector}`);
    }

    const todoElement = template.content.cloneNode(true);

    const titleElement = todoElement.querySelector(".todo-title");
    const descriptionElement = todoElement.querySelector(".todo-description");

    if (!titleElement || !descriptionElement) {
      throw new Error(
        "Template missing required elements (.todo-title, .todo-description)"
      );
    }

    titleElement.textContent = this.data.title;
    descriptionElement.textContent = this.data.description;

    const checkbox = todoElement.querySelector(".checkbox");
    if (checkbox) {
      checkbox.checked = this.data.isComplete;
    }

    this._setEventListeners(todoElement);

    // Add visual feedback based on completion status
    this._applyCompletionStyle(todoElement);

    return todoElement;
  }

  _setEventListeners(todoElement) {
    const deleteButton = todoElement.querySelector(".delete-button");
    const checkbox = todoElement.querySelector(".checkbox");

    if (!deleteButton || !checkbox) {
      console.error("Missing delete button or checkbox in the template.");
      return;
    }

    deleteButton.addEventListener("click", () => {
      this._deleteTodo();
    });

    checkbox.addEventListener("change", (event) => {
      this._toggleComplete(event);
    });
  }

  _applyCompletionStyle(todoElement) {
    const todoContainer = todoElement.querySelector(".todo-container");
    if (todoContainer) {
      if (this.data.isComplete) {
        todoContainer.classList.add("completed");
      } else {
        todoContainer.classList.remove("completed");
      }
    }
  }

  _deleteTodo() {
    const todoElement = document.querySelector(`#todo-${this.data.id}`);
    if (todoElement) {
      todoElement.remove();
    }

    // Optionally emit a custom event
    const event = new CustomEvent("todoDeleted", { detail: this });
    this.element.dispatchEvent(event);

    console.log("Todo deleted!");
  }

  _toggleComplete(event) {
    this.data.isComplete = event.target.checked;
    console.log("Todo complete state updated:", this.data.isComplete);

    // Apply the visual feedback when the completion state changes
    this._applyCompletionStyle(event.target.closest(".todo-element"));
  }
}

export default Todo;
