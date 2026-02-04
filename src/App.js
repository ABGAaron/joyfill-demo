import React, { useState, createContext, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import { JoyDoc } from '@joyfill/components';
import { data } from './data';
import { initialData } from './initial-data';
import { themes } from './themes';
import styled from 'styled-components';

// Create a context to manage theme and mode state
export const ThemeContext = createContext('null');

// Styled component for the main app container
const AppContainer = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  padding-left: 215px;
`;
// Styled component for the JoyDoc container
const JoyDocContainer = styled.div`
  margin: 20px;
`;

const ExportButton = styled.button`
  margin: 20px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
`;

const injectValues = (doc, values) => {
  return {
    ...doc,
    fields: doc.fields.map(field => {
      if (values[field.identifier] !== undefined) {
        return {
          ...field,
          value: values[field.identifier]
        };
      }
      return field;
    })
  };
};

const App = () => {
  // State hooks for theme, mode, name, and selected document
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('edit');
  const [name, setName] = useState('Intake Form');
  const [doc, setDoc] = useState('templateTwo');
  const [joyDoc, setJoyDoc] = useState(data[doc]);

  // Event handler to toggle mode
  const toggleMode = (mode) => {
    setMode(mode);
  };

  // Event handler to toggle theme
  const toggleTheme = (theme) => {
    setTheme(theme);
  };

  // Update background color based on theme changes
  useEffect(() => {
    let backgroundColor;
    switch (theme) {
      case 'light':
      case 'brand': // Set brand theme background color to be the same as light theme
        backgroundColor = '#e8e8e8';
        break;
      default:
        backgroundColor = '#343435'; // Set dark theme background color
        break;
    }
    document.documentElement.style.backgroundColor = backgroundColor;
  }, [theme]);

  const handleChanged = (changeLog, updatedDoc) => {
    setJoyDoc({ ...updatedDoc });
  };

  const exportPDF = async () => {
    try {
      const res = await fetch('http://localhost:3005/export/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document: joyDoc
        })
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'joyfill-document.pdf';
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log('@err', { err });
    }
  };

  return (
    <ThemeContext.Provider
      value={{ name, setName, mode, toggleMode, doc, setDoc, theme, toggleTheme }}
    >
      <AppContainer className="app">
        <Header />
        <Sidebar />
        <ExportButton onClick={exportPDF}>
          Export PDF
        </ExportButton>
        <JoyDocContainer>
          <JoyDoc mode={mode} theme={themes[theme]} doc={injectValues(joyDoc, initialData[doc])} onChange={handleChanged}/>
        </JoyDocContainer>
      </AppContainer>
    </ThemeContext.Provider>
  );
};

export default App;
