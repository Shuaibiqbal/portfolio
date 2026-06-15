"""
Portfolio local dev server with live reload.
Automatically refreshes the browser whenever you save any file.

INSTALL (one time only):
    pip install livereload

RUN:
    Windows:      python  run_dev.py
    Mac / Linux:  python3 run_dev.py

Then open:  http://localhost:8000
To stop:    Ctrl + C
"""

try:
    from livereload import Server
except ImportError:
    print("\n  livereload not installed.")
    print("  Run: pip install livereload\n")
    raise SystemExit(1)

server = Server()

server.watch("data/*.json")
server.watch("js/**/*.js")
server.watch("css/*.css")
server.watch("index.html")

print("\n  Portfolio dev server starting...")
print("  Open: http://localhost:8000")
print("  Auto-refreshes on any file save.")
print("  Stop: Ctrl + C\n")

server.serve(root=".", port=8000, host="localhost", open_url_delay=1)
