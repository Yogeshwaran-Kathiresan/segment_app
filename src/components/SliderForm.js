import React, { useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function SliderForm({ isOpen, onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);
  const [selectedSchema, setSelectedSchema] = useState("");
  const [isSegmentPosted, setIsSegmentPosted] = useState(false);

  // To add new Schema to the Schemas Array
  const handleAddSchema = () => {
    if (selectedSchema) {
      const schemaToAdd = availableSchemas.find(
        (schema) => schema.value === selectedSchema
      );
      setSelectedSchemas([...selectedSchemas, schemaToAdd]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== selectedSchema)
      );
      setSelectedSchema("");
    }
  };

  // To handle the changes in the added schemas.
  const handleSchemaChange = (index, newValue) => {
    const newSchema = availableSchemas.find(
      (schema) => schema.value === newValue
    );

    const oldSchema = selectedSchemas[index];

    const updatedSchemas = [...selectedSchemas];
    updatedSchemas[index] = newSchema;
    setSelectedSchemas(updatedSchemas);

    setAvailableSchemas((prevAvailableSchemas) =>
      prevAvailableSchemas
        .filter((schema) => schema.value !== newValue)
        .concat(oldSchema)
    );
  };

  // To handle submission of Segment and Schema.
  const handleSaveSegment = async () => {
    const schemaData = selectedSchemas.map((schema) => ({
      [schema.value]: schema.label,
    }));

    const data = {
      segment_name: segmentName,
      schema: schemaData,
    };

    console.log("Data to send:", data);

    try {
      const response = await fetch(
        "https://webhook.site/9f9e3122-7931-4020-8b2e-440715a94360",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "no-cors",
        }
      );

      if (response.ok || response.type === "opaque") {
        setIsSegmentPosted(true);
        setTimeout(() => setIsSegmentPosted(false), 3000);
      } else {
        console.error("Failed to post segment:", response.statusText);
      }
      setTimeout(() => handleClose(), 3000);
    } catch (error) {
      console.error("Error posting segment:", error);
    }
  };

  //  To clear the form States and close popup
  const handleClose = () => {
    setSegmentName("");
    setSelectedSchemas([]);
    setAvailableSchemas([
      { label: "First Name", value: "first_name" },
      { label: "Last Name", value: "last_name" },
      { label: "Gender", value: "gender" },
      { label: "Age", value: "age" },
      { label: "Account Name", value: "account_name" },
      { label: "City", value: "city" },
      { label: "State", value: "state" },
    ]);
    setSelectedSchema("");
    setIsSegmentPosted(false);

    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ${isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:w-2/5 w-full flex flex-col`}
    >
      <header className="bg-[#3fc8d9]">
        <div className="flex items-center lg:px-5 sm:px-10 lg:py-6 py-4">
          <RiArrowLeftSLine
            className="text-white mr-3 text-xl cursor-pointer"
            onClick={handleClose}
          />
          <h2 className="text-white font-medium">Saving Segment</h2>
        </div>
      </header>
      <div className="overflow-y-auto flex-grow">
        <form className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700">
              Enter the Name of the Segment
            </label>
            <input
              type="text"
              placeholder="Name of the segment"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              required
            />
          </div>

          <p className="text-gray-500 text-sm mb-4">
            To save your segment, you need to add the schemas to build the
            query.
          </p>

          <div className="bg-[#e5f7f8] p-4 rounded-lg mb-4">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className="flex items-center mb-3">
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={schema.value}
                  onChange={(e) => handleSchemaChange(index, e.target.value)}
                >
                  {availableSchemas.concat(schema).map((availableSchema) => (
                    <option
                      key={availableSchema.value}
                      value={availableSchema.value}
                    >
                      {availableSchema.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedSchema}
              onChange={(e) => setSelectedSchema(e.target.value)}
            >
              <option value="">Add schema to segment</option>
              {availableSchemas.map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="text-[#3fc8d9] ml-4"
              onClick={handleAddSchema}
            >
              + Add new schema
            </button>
          </div>

          <div className="flex justify-start bg-gray-300 p-4">
            <button
              type="button"
              className="bg-[#3fc8d9] text-white py-2 px-4 rounded"
              onClick={handleSaveSegment}
            >
              Save the Segment
            </button>
            <button
              type="button"
              className="bg-white-500 text-red-600 bg-slate-200 font-bold py-2 px-4 rounded ml-4"
              onClick={handleClose}
            >
              Cancel
            </button>
            {isSegmentPosted && (
              <div className="ml-4 bg-[#3fc8d9] text-white py-2 px-4 rounded">
                Segment Posted Successfully
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}