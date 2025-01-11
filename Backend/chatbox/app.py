# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from difflib import get_close_matches

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

KNOWLEDGE_BASE_FILE = "knowledge_base.json"

def load_knowledge_base(file_path: str) -> dict:
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print("Knowledge base file not found. Creating a new one.")
        return {"questions": []}

def save_knowledge_base(file_path: str, data: dict) -> None:
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

def find_best_match(user_question: str, questions: list) -> str:
    matches = get_close_matches(user_question.lower(), [q.lower() for q in questions], n=1, cutoff=0.7)
    return matches[0] if matches else None

def get_answer_for_question(question: str, knowledge_base: dict) -> str:
    for q in knowledge_base["questions"]:
        if q["question"].lower() == question.lower():
            return q["answer"]
    return None

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_question = data.get("question", "").strip()
    
    if not user_question:
        return jsonify({"reply": "Please enter a valid question."}), 400
    
    knowledge_base = load_knowledge_base(KNOWLEDGE_BASE_FILE)
    questions = [q["question"] for q in knowledge_base["questions"]]
    
    best_match = find_best_match(user_question, questions)
    
    if best_match:
        answer = get_answer_for_question(best_match, knowledge_base)
        return jsonify({"reply": answer}), 200
    else:
        # Log the unanswered question for potential training
        print(f"Unanswered Question: {user_question}")
        return jsonify({"reply": "I don't know what you meant. Can you teach me?"}), 404

@app.route('/teach', methods=['POST'])
def teach():
    data = request.get_json()
    user_question = data.get("question", "").strip()
    user_answer = data.get("answer", "").strip()
    
    if not user_question or not user_answer:
        return jsonify({"message": "Invalid data."}), 400
    
    knowledge_base = load_knowledge_base(KNOWLEDGE_BASE_FILE)
    # Check if question already exists
    for q in knowledge_base["questions"]:
        if q["question"].lower() == user_question.lower():
            return jsonify({"message": "Question already exists."}), 409
    
    knowledge_base["questions"].append({
        "question": user_question,
        "answer": user_answer
    })
    save_knowledge_base(KNOWLEDGE_BASE_FILE, knowledge_base)
    print(f"New Q&A added: {user_question} -> {user_answer}")
    return jsonify({"message": "Thanks for teaching me!"}), 201

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
