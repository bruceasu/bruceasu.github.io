@ECHO off
SETLOCAL
SET CWD=%CD%
set APP_DIR=%~dp0
CD %APP_DIR%
java -Dfile.encoding=UTF-8 -Dconfig.file=blog.properties -jar asu-static-blog-1.0-SNAPSHOT.jar
CD %CWD%
EndLocal
pause