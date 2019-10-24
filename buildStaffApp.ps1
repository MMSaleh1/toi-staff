cd D:\MMS\toi-staff
ionic cordova build android --release --prod
cd D:\MMS\toi-staff\platforms\android\app\build\outputs\apk\release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ToiStaff.jks app-release-unsigned.apk ToiStaff -storepass 123456
C:\Users\'Mohammad Magdy'\AppData\Local\Android\Sdk\build-tools\28.0.3\zipalign -v 4 app-release-unsigned.apk ToiStaff.apk
cd ../../../../../../../