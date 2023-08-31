import { useState, useEffect } from 'react'
import '../styles/App.css'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

//light and dark theme colors
const lightTheme = {
  background: "#f6f6f6",
  text: "#060606",
  textBackground: "#6474E5",
  accent: "#f4a4a4",
  editorBackground: "#fff",
  editorColor: "black"
}

const darkTheme = {
  background: "#2e3047",
  text: "#3bba9c",
  textBackground: "#3c3f58",
  accent: "#707793",
  editorBackground: "black",
  editorColor: "#26ec10"
}

//main content component
function MainContent(props) {

//default markdown in textarea
const [markdown, setMarkdown] = useState(`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`);

  //Interpret \r as <br>
  marked.use({
    gfm: true,
    breaks: true
  })

  //update text in editor
  const handleChange = (event) => {
    setMarkdown(event.target.value);
  }

  //convert markdown to HTML
  const convertToHTML = (markdownText) => {
    return DOMPurify.sanitize(marked(markdownText));
  }
  
  return (
    <section id="main-content">
      <div id="editor-container" style={{color: props.colors.text, borderColor: props.colors.textBackground}}>
        <p style={{backgroundColor: props.colors.accent}}>Editor</p>
        <textarea id="editor" style={{backgroundColor: props.colors.editorBackground, color: props.colors.editorColor}} onChange={handleChange} value={markdown}></textarea>
      </div>
      <div id="preview-container" style={{color: props.colors.text, borderColor: props.colors.textBackground}}>
        <p style={{backgroundColor: props.colors.accent}}>Previewer</p>
        <div id="preview" className={`${props.colors == darkTheme ? 'prev-dark' : ''}`} dangerouslySetInnerHTML={{__html: convertToHTML(markdown)}}></div>
      </div>
    </section>
  )
}

//root component to render app
function App() {
  
  //theme and color palette state
  const [theme, setTheme] = useState("light");
  const [colorPalette, setColorPalette] = useState(lightTheme);

  //change color palette and background character depending on value of theme
  useEffect(() => {
    setColorPalette(theme == "light" ? lightTheme : darkTheme);
    if(theme == "light") {
      document.body.style.backgroundColor = "#ffffff";
    }
    else {
      document.body.style.backgroundColor = "#030303";
    }
  }, [theme]);

  //change theme when sliding button is clicked
  const toggle = () => {
    setTheme(theme == "light" ? "dark" : "light");;
    console.log(theme, colorPalette);
  };

  return (
    <main theme={theme}>
      <div>
        <h1 style={{color: colorPalette.text}}>Markdown Previewer</h1>
        <button className={`sliding-button ${theme}`} onClick={toggle}>
          <span className='button-text'>{theme == 'light' ? 'dark' : 'light'}</span>
          <div className='slider'></div>
        </button>
      </div>
      <MainContent colors={colorPalette}/>
    </main>
  )
}

export default App
