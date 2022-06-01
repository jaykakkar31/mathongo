# mathongo


## Sign Up
### api : https://mathongo-server.herokuapp.com/api/user/signup

### Post request with parameters email,password,firstname,lastname

![Screenshot (115)](https://user-images.githubusercontent.com/69637792/171494347-00df418c-1c0a-4d65-ba4a-1a9498a87c7d.png)

### OTP send to mail for verification

![Screenshot (116)](https://user-images.githubusercontent.com/69637792/171494479-4fa08d63-0ae0-4091-8874-766595be9a8f.png)

## Email verification with OTP
### api :https://mathongo-server.herokuapp.com/api/user/verifyemail
### Patch request with parameters email,otp
### active was initially set to False after verification set to True

![Screenshot (117)](https://user-images.githubusercontent.com/69637792/171494981-e83782a1-7639-4c08-bb5e-b466a1c34bcb.png)

## Login
### api: https://mathongo-server.herokuapp.com/api/user/login
### Post requst with parameters email,password
### After login token is generated
![Screenshot (118)](https://user-images.githubusercontent.com/69637792/171496084-1fdff610-aff6-47e3-9708-fc41ee40dd74.png)

## Forgot Password 
### api: https://mathongo-server.herokuapp.com/api/user/forgotPassword
### Post request with parameter email
![Screenshot (119)](https://user-images.githubusercontent.com/69637792/171496512-5c485b88-584c-43e3-9b51-b37376b8219f.png)
![Screenshot (120)](https://user-images.githubusercontent.com/69637792/171497556-81eeebd1-b1ac-49b2-b2ff-d323926f3fd7.png)

## Reset Password
### api: https://mathongo-server.herokuapp.com/resetPassword/:token
### Patch request with parameter new password 
![Screenshot (121)](https://user-images.githubusercontent.com/69637792/171498183-cfaaecf9-7bd1-43fc-b163-82ed25570134.png)

## Logout 
### api : https://mathongo-server.herokuapp.com/logout
### Patch request with parameter email
### After logout token set to  null
![Screenshot (122)](https://user-images.githubusercontent.com/69637792/171500287-5ae33458-a626-4890-987c-6bb23ff9e85e.png)











<!--  -->
