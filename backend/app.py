from config import app

@app.route('/', methods = ['GET', 'POST'])
def home():
    return 'Welcome to Home Page...'

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
