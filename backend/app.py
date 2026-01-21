from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"success": False, "message": "Missing data"}), 400

    return jsonify({
        "success": True,
        "message": f"Data received for {name}"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
