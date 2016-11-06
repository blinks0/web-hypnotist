# web!hypnotist

This is a hypnosis web-app, which uses a simple script to generate a hypnosis-session with both speech, audio and visuals.

The language basically uses the following commands:

To play the script: 

Click the ”Play”-button to play the script in the text-area. To play part of the script for testing you can highlight part of the text and click play. Then only the highlighted part will play. 

Making a script:

Text in the text-area will be spoken. But you can by inserting commands into the text change voice, speech rate and volume, view images, play music and sound effects among other things.

Example scripts are located at the bottom of this document.

The language basically uses the following commands:

To speak lines:

Just write a line and it will be spoken as the script plays

This line will be spoken.


To comments:

A line that begins by a %-sign will be skipped. Hence you can make comments in your scrip.

This line will be spoken. 
%This line will be ignored 

Commands:

To make Speaker do things other than just speaking and not speaking we have one rule. A who’s first letter is a !-sign will be interpreted as a command. !examplecommand input

Make sure there is only one blank space between command and input. Examples will follow later.


To make a pause:

The lines will be spoken one after another. If there is a blank space between two lines there will be a pause of 0.5 seconds between them.

This line will be spoken.
After a 0.5 second pause this will be spoken. 

Another way to make a pause is to use the !pause command

!pause t 

Will pause for t seconds, where t is any number. For example:

This line will be spoken.
!pause 4.23
After a 4.23 second pause this will be spoken.



To change the speakers talking speed:

To change the rate of words per minute we use the !rate command. The !speed command does the same thing.

!rate 0.6
This line will be spoken at rate 0.6. It’s slower than standard.

!rate 1
This line will be spoken at the standard rate. 


To change the speakers volume:

Changing the speech-volume is done by the !volume command. A volume of 1 is the standard volume . 

!volume 0.5 This line will be spoken more quiet. !volume 1.3 This line will be spoken more loudly. !volume 1 This line will be spoken with the standard volume. !volume 0 This line will not be heard at all. 

To change the speakers gender:

You can change between a male and female speaker with the !gender command

!gender f
This line will be spoken by a female voice.

!gender m
This line will be spoken by a male voice.

!gender female
This line will be spoken by a female voice again.


To play sound effects:

Sound effects are played with the !sound command

!sound snap

Will make the sound of a finger snapping. 

!sound heart

Will make the sound of a heartbeat. See the full list of available sounds at the bottom of this document.


To play music from YouTube:

You can play music from a YouTube-link with the !youtubemusic command.

!youtubemusic https://www.youtube.com/watch?v=6GdP31jXyEY
Now you can hear the sound of the YouTube video specified. 

!youtubemusic https://www.youtube.com/watch?v=Cnfj6QCGLyA
Now another YouTube video is playing.

!youtubemusicvolume 0.5
The YouTube-music is now playing at 50% volume.

!youtubemusic off
Now there is no music playing.

Make sure you use the full youtube adress and not the shortened one.

To show an image or animation:

Images is handled with the !urlimage command. 

!urlimage http://www.example.com/imagefile.gif
Now the image from the given url will be shown. If it is an animated image it will show as such.

Remember that larger images will take longer before they show.

To change the size of the image we use the !imagesize command.

!imagesize 300
Now the image will have the height 300 pixels


To change background-color:

Sometimes you may want to change the page’s background-color in order to match your image better. This is done with the !bgcolor command.

!bgcolor black
Now the page will have a black background

!bgcolor #3f5c93
Hex codes work as well. This would be the standard blue background.

The color is always reset after a script has stopped.


To share a script:

Click the ”Share Script”-button and a window with a link to your script will open. It will be extremely long, maybe even to long to copy-paste into a Google-Chrome window. Clicking on it as a link should work as well I think. You can use an url-shortener to make it shorter. 

You can also download the script as a .txt-file to your own computer for safekeeping. Just click the download-button.

Sound-effects avalible:

The possible sounds to play with the !sound-command are
	•	snap
	•	ding
	•	bong
	•	sigh
	•	outdoorfootsteps
	•	heart
	•	heels
	•	giggle
	•	slap
	•	glasscrash

