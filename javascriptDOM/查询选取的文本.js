function getSelectedText() {
  if(window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection) {//IE特有
     return document.selection.createRange().text;
  }
}
