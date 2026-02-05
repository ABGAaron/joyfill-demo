import React, { useState, useContext } from "react";
import { JoyDoc } from "@joyfill/components";
import { ThemeContext } from "../../App";
import { data } from "../../data";
import { themes } from "../../themes";
import {
  BuilderContainer,
  BuilderHeader,
  TemplateSelector,
  TemplateLabel,
  TemplateSelect,
  SaveButton,
  JoyDocWrapper,
} from "./styles/StyledBuilder";

const templateOptions = [
  { key: "packingInstructions", name: "Packing Instructions" },
  { key: "templateOne", name: "Cleaning Checklist" },
  { key: "templateTwo", name: "Intake Form" },
  { key: "templateThree", name: "Fire Pump Inspection" },
  { key: "templateFour", name: "Workers Compensation" },
];

const Builder = () => {
  const { theme, mode } = useContext(ThemeContext);
  const [selectedTemplate, setSelectedTemplate] = useState(
    "packingInstructions",
  );
  const [joyDoc, setJoyDoc] = useState(() => {
    // Load from localStorage if available, otherwise use default data
    try {
      const savedTemplates = JSON.parse(
        localStorage.getItem("savedTemplates") || "{}",
      );
      if (savedTemplates["packingInstructions"]) {
        return savedTemplates["packingInstructions"];
      }
    } catch (error) {
      console.error("Error loading saved template:", error);
    }
    return data["packingInstructions"];
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleTemplateChange = (e) => {
    const templateKey = e.target.value;
    setSelectedTemplate(templateKey);

    // Try to load from localStorage first, then fall back to default data
    let templateData;
    try {
      const savedTemplates = JSON.parse(
        localStorage.getItem("savedTemplates") || "{}",
      );
      if (savedTemplates[templateKey]) {
        templateData = savedTemplates[templateKey];
        console.log("Loading template from localStorage:", templateKey);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }

    if (!templateData) {
      templateData = data[templateKey];
      console.log("Loading template from default data:", templateKey);
    }
    // Debug: Check all three date fields
    if (templateKey === "packingInstructions") {
      const fieldPositions =
        templateData?.files?.[0]?.pages?.[0]?.fieldPositions;
      const dateFields = fieldPositions?.filter(
        (fp) =>
          fp.field === "65f89dab707f4659709fb8d0" ||
          fp.field === "65f89dab707f4659709fb8d1" ||
          fp.field === "65f89dab707f4659709fb8d2",
      );
      console.log(
        "All three date fieldPositions:",
        JSON.stringify(dateFields, null, 2),
      );
    }
    if (templateData) {
      setJoyDoc(templateData);
    } else {
      console.error("Template not found:", templateKey);
    }
  };

  const handleDocChange = (changeLog, updatedDoc) => {
    setJoyDoc({ ...updatedDoc });
  };

  const handleUploadAsync = async (params, fileUploads) => {
    // For demo purposes, convert the first file to base64 data URL
    // In production, you would upload to your server/S3 and return the URL
    const file = fileUploads?.[0];
    if (!file) {
      return { url: "" };
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ url: reader.result });
      };
      reader.onerror = () => {
        resolve({ url: "" });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = () => {
    setIsSaving(true);

    // Update the in-memory data object so changes persist during the session
    data[selectedTemplate] = { ...joyDoc };

    // Also save to localStorage for persistence across page refreshes
    try {
      const savedTemplates = JSON.parse(
        localStorage.getItem("savedTemplates") || "{}",
      );
      savedTemplates[selectedTemplate] = joyDoc;
      localStorage.setItem("savedTemplates", JSON.stringify(savedTemplates));

      console.log("Template saved:", selectedTemplate, joyDoc);
      alert(
        `Template "${templateOptions.find((t) => t.key === selectedTemplate)?.name}" saved successfully!`,
      );
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Error saving template. See console for details.");
    }

    setIsSaving(false);
  };

  // Load saved templates from localStorage on mount
  React.useEffect(() => {
    try {
      const savedTemplates = JSON.parse(
        localStorage.getItem("savedTemplates") || "{}",
      );
      // Update in-memory data object with saved templates
      Object.keys(savedTemplates).forEach((key) => {
        if (data[key]) {
          data[key] = savedTemplates[key];
        }
      });
      // Reload current template if it was saved
      if (savedTemplates[selectedTemplate]) {
        setJoyDoc(savedTemplates[selectedTemplate]);
      }
    } catch (error) {
      console.error("Error loading saved templates:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BuilderContainer>
      <BuilderHeader>
        <TemplateSelector>
          <TemplateLabel theme={theme}>Template:</TemplateLabel>
          <TemplateSelect
            theme={theme}
            value={selectedTemplate}
            onChange={handleTemplateChange}
          >
            {templateOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.name}
              </option>
            ))}
          </TemplateSelect>
        </TemplateSelector>

        <SaveButton onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </SaveButton>
      </BuilderHeader>

      <JoyDocWrapper>
        <JoyDoc
          mode={mode}
          theme={themes[theme]}
          doc={joyDoc}
          onChange={handleDocChange}
          onUploadAsync={handleUploadAsync}
        />
      </JoyDocWrapper>
    </BuilderContainer>
  );
};

export default Builder;
