from flask import Flask
import os
import time
import subprocess

app = Flask(__name__)

@app.route('/htop')
def htop():
    try:
        name = "Maaheen Anwar"
        # Use os.environ.get to retrieve the username
        username = os.environ.get('USER') or os.environ.get('USERNAME') or 'Unknown User'
        server_time = time.strftime('%Y-%m-%d %H:%M:%S %Z', time.gmtime(time.time() + 5.5 * 3600))  # IST
        
        # Use 'top' command for Unix/Linux systems
        top_output = subprocess.getoutput('top -b -n 1')  # Get the top output for Linux

        return f'''
        <p><b>Name:</b> {name}</p>
        <p><b>Username:</b> {username}</p>
        <p><b>Server Time (IST):</b> {server_time}</p>
        <p><b>TOP output:</p>
        <pre>{top_output}</pre>
        '''
    except Exception as e:
        return f"An error occurred: {str(e)}"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
