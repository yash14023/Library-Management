import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CommandDemo() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const commands = [
    { path: "/booklist", label: "Book List", icon: "📚" },
    { path: "/member", label: "Member", icon: "👤" },
    { path: "/transaction", label: "Transaction", icon: "💳" },
    { path: "/transaction/return/1", label: "Return Transaction", icon: "🔄" },
  ];

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setShowSuggestions(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowSuggestions(false);
  };

  const filteredCommands = commands.filter(command =>
    command.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="command rounded-lg border shadow-md">
      <input
        className="command-input"
        placeholder="Type a command or search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {showSuggestions && (
        <div className="command-list">
          {filteredCommands.length > 0 ? (
            <div className="command-group">
              <div className="command-heading">Suggestions</div>
              {filteredCommands.map((command) => (
                <div
                  key={command.path}
                  className="command-item"
                  onMouseDown={() => handleNavigate(command.path)}
                >
                  <span className="icon">{command.icon}</span>
                  <span>{command.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="command-empty">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}

// CSS styles
const styles = `
  .command {
    padding: 1rem;
    background: white;
  }

  .command-input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .command-list {
    border-top: 1px solid #eee;
  }

  .command-empty {
    padding: 0.5rem;
    color: #999;
  }

  .command-group {
    margin-top: 1rem;
  }

  .command-heading {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .command-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
  }

  .command-item.disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  .command-item .icon {
    margin-right: 0.5rem;
  }

  .command-separator {
    border-top: 1px solid #eee;
    margin: 1rem 0;
  }

  .command-shortcut {
    margin-left: auto;
    color: #999;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
