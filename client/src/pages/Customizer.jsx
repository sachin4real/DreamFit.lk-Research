import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, FilePicker, Tab } from '../components';
import { AiFillCamera } from 'react-icons/ai'; 

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("filepicker");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />;
      case "aipicker":
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />;
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  } 

  // Function to handle canvas download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.setAttribute("download", "canvas.png");
    link.setAttribute(
      "href",
      document
        .querySelector("canvas")
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
    );
    link.click();
  };



  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logo":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "style":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }


  
  return (
    <AnimatePresence>
      (
        <>
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-2">
        Customize As You Need
         </h1>
          {/* //customizer Editor tabs */}
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            
            <div className="flex items-center min-h-screen ">
              <div className=" editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

 

          {/* bottom filter tabs for customize shirt */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
           {FilterTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleActiveFilterTab(tab.name)}
                className={`bg-transparent hover:bg-green-300 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded  ${activeFilterTab[tab.name] ? 'active-class' : ''}`}
              >
                {tab.name}
              </button>
            ))}
          </motion.div>

          {/* Download button */}
          <motion.div
            className="absolute z-10 bottom-10 right-10"
            {...fadeAnimation}
          >
            <button
              className="share bg-gradient-to-r from-green-300 via-teal-300 to-cyan-400 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={handleDownload}
            >
              DOWNLOAD
              <AiFillCamera size="1.3em" className="ml-2" />
            </button>
          </motion.div>
        </>
      )
    </AnimatePresence>
  );
};

export default Customizer;
