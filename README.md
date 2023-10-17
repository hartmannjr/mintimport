# mintimport
imports mints csv files for assets and liabilities into a running list on a google sheet of your choosing.

this code is for trimming and importing assets and liabilities csv's from Mint.com. 

Requirements: 
Must have: 

google drive folders named:
- AssetImport
- LiabilityImport

Google sheet with sheets named:
- AssetImport
- LiabilityImport

daily trigger


Setup: 

When in your google sheet, go to Extension > App Script
copy the code fom the Code.gs file into the Code.gs file on your Apps Script Project.

Set up trigger:
1. in your sheets Apps Script project go to Triggers
2. "+ Add Trigger"
3. Set the following
   - Choose which funtion to run: "run"
   - Chose which deployment should run: "Head"
   - Select event source: "Time-driven
   - Select type of time based trigger: ideally, set this to daily, but choose whatever seems best for your use case
   - Select hour interval: I chose 10pm to 11pm so if I upload data that day, it will be processed overnight. Again, choose what seems best for your case

you can also run this manually by adding the macro to your sheet:
1. go to Extensions > Macros > Import Macro
2. scroll down to "run" and select "Add Function"

to acquire csv's:
1. go to Mint.com > Trends > Assets > By account
2. scroll to bottom > "Export to CSV"
3. save "trends.csv" // it's important that you keep this name exactly, otherwise the code will not run correctly. If you are saving the files by downloading, you will need to download one, then upload, before saving over it to download the second sheet, or keep in mind which is which, and modify the names back to "trends.csv" when they are in their respective folders. 
4. upload file to respective folder outlined in Setup.
   - when asked if you want to replace the file, or keep both files, choose replace. 
repeat these steps for Liabilities.

there is a chrome extension called "Save to Google Drive" that allows you to right click on the download link in step 2 and save directly to drive. 
this allows you to skip the trouble of downloading the files of the same name and having Windows try to override the name to "trends (1).csv" (if you save and upload with this name, this code will fail)

credit to u/zacce for the inspiration
https://www.reddit.com/r/mintuit/comments/f0ts2q/howto_automatically_import_mintcom_transactions/
