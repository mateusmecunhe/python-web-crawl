# python-web-crawl

This project crawls a real estate auction website, using beautiful soup and flask.
then, it shows all crawled houses in auction in the home page.

Through js and regex, all measuring areas get wrapped in a span that turns such text background to yellow (upon clicking to see more details).

Once a user clicks in any of the yellow background areas, a json is sent back to the server, 
containing information on the house being auctioned and a timestamp of the time of the click.

to run it, clone it, install any needed dependencies stated in requirements.txt, and run the command `flask run`.
