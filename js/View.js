export default class View {
  //Kreiranje konstruktora
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    //Ovo je HTML koji je izmenjiv pomocu JS
    this.root.innerHTML = `
            <div class="aside_container">
                <div class="exit">
                  <i class="fas fa-times"></i>
                </div>
                <button class="add_btn">Add new note</button>
                <div class="note_aside">
                    
                </div>
            </div>
            <div class="main_container">
                <input class="note_title" type="text" placeholder="Type title here.."/>
                <textarea class="note_body">Type some text here...</textarea>
            </div>
        `;

    const btnAddNote = this.root.querySelector(".add_btn");
    const inputTitle = this.root.querySelector(".note_title");
    const inputBody = this.root.querySelector(".note_body");

    //Dogadjaj na dugme "Add note"
    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    //Blur dogadjaj za title i body
    inputTitle.addEventListener("blur", () => {
      const updatedTitle = inputTitle.value.trim();
      const updatedBody = inputBody.value.trim();
      this.onNoteEdit(updatedTitle, updatedBody);
    });

    //Blur dogadjaj za title i body
    inputBody.addEventListener("blur", () => {
      const updatedTitle = inputTitle.value.trim();
      const updatedBody = inputBody.value.trim();
      this.onNoteEdit(updatedTitle, updatedBody);
    });

    //Po difoltu da glavni ispis bude nevidljiv kada se ucita stranica
    this.updateNotePreviewVisibility(false);
  }
  //Side bar list items
  _createListItemHTML(id, title, body, updated) {
    const max_body_length = 60;

    return `
        <div class="note" data-note-id="${id}">
            <h3 class="note_title_aside">${title}</h3>
            <p class="note_text_content">
            ${body.substring(0, max_body_length)}
            ${body.length > max_body_length ? "..." : ""}
            </p>
            <p class="note_date">${updated.toLocaleString(undefined, {
              dateStyle: "full",
              timeStyle: "short",
            })}</p>
        </div>

        `;
  }

  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".note_aside");

    //Prvo sto radimo je da praznimo kontejner od list itema
    notesListContainer.innerHTML = "";
    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    //Add, select/delete events for each list item
    notesListContainer.querySelectorAll(".note").forEach((noteListItem) => {
      noteListItem.addEventListener("click", () => {
        this.onNoteSelect(noteListItem.dataset.noteId);
      });
      noteListItem.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");
        if (doDelete) {
          this.onNoteDelete(noteListItem.dataset.noteId);
        }
      });
    });
  }

  //Na klik aside item ispisujemo u main_container njegovu vrednost 
  //U isto vreme dodajemo klasu ya boldovanje na aktivan item
  updateActiveNote(note) {
    this.root.querySelector(".note_title").value = note.title;
    this.root.querySelector(".note_body").value = note.body;

    this.root.querySelectorAll(".note").forEach(noteListItem => {
      noteListItem.classList.remove("note--selected");
    })
    this.root.querySelector(`.note[data-note-id='${note.id}']`).classList.add("note--selected");
  }

  //Inicijalno sakrivamo sadrzaj u glavnom kontejneru sve dok ne kliknemo na neki item
  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".main_container").style.visibility = visible ? "visible" : "hidden";
  }
}
