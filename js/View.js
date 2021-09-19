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
                <button class="add_btn">Add new note</button>
                <div class="note_aside">
                    <div class="note">
                        <h3 class="note_title_aside">This is first note</h3>
                        <p class="note_text_content">This is text of the first note...</p>
                        <p class="note_date">September 18, 8:34pm</p>
                    </div>
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
    })

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
  }
}
