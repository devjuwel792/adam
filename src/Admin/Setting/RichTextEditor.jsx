"use client"

import { useState, useRef, useEffect } from "react"

const RichTextEditor = ({ value, onChange, placeholder = "Enter text...", className = "" }) => {
  const editorRef = useRef(null)
  const [fontSize, setFontSize] = useState("12")

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || ""
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const formatButtons = [
    { icon: "B", action: "bold", title: "Bold" },
    { icon: "I", action: "italic", title: "Italic" },
    { icon: "U", action: "underline", title: "Underline" },
  ]

  const alignmentButtons = [
    { icon: "≡", action: "justifyLeft", title: "Align Left" },
    { icon: "≣", action: "justifyCenter", title: "Align Center" },
    { icon: "≡", action: "justifyRight", title: "Align Right" },
  ]

  return (
    <div className={`border border-gray-300 rounded-md ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-4 p-3 border-b border-gray-200 bg-gray-50">
        {/* Font Size */}
        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value)
            applyFormat("fontSize", e.target.value)
          }}
          className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="1">10px</option>
          <option value="2">12px</option>
          <option value="3">14px</option>
          <option value="4">16px</option>
          <option value="5">18px</option>
          <option value="6">24px</option>
        </select>

        {/* Format Buttons */}
        <div className="flex items-center gap-1">
          {formatButtons.map((button) => (
            <button
              key={button.action}
              title={button.title}
              onClick={() => applyFormat(button.action)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm font-bold hover:bg-gray-100 transition-colors"
            >
              {button.icon}
            </button>
          ))}
        </div>

        {/* Alignment Buttons */}
        <div className="flex items-center gap-1">
          {alignmentButtons.map((button) => (
            <button
              key={button.action}
              title={button.title}
              onClick={() => applyFormat(button.action)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              {button.icon}
            </button>
          ))}
        </div>

        {/* List Buttons */}
        <div className="flex items-center gap-1 ml-4">
          <button
            onClick={() => applyFormat("insertUnorderedList")}
            title="Bullet List"
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors"
          >
            •
          </button>
          <button
            onClick={() => applyFormat("insertOrderedList")}
            title="Numbered List"
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors"
          >
            1.
          </button>
        </div>

        {/* Text Color */}
        <div className="flex items-center gap-1 ml-4">
          <input
            type="color"
            onChange={(e) => applyFormat("foreColor", e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            title="Text Color"
          />
          <input
            type="color"
            onChange={(e) => applyFormat("hiliteColor", e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            title="Highlight Color"
          />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[120px] p-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-inset"
        style={{
          fontSize: `${fontSize === "1" ? "10" : fontSize === "2" ? "12" : fontSize === "3" ? "14" : fontSize === "4" ? "16" : fontSize === "5" ? "18" : "24"}px`,
        }}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
    </div>
  )
}

export default RichTextEditor
