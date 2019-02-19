### Youcanbook.me API wrapper

A very small wrapper for the Youcanbook.me api.

You set the credentials, it will grab the first profile on your dashboard and you can submit bookings to it.

# Usage

```
import YouCanBookMeApi from './youcanbookme-api-wrapper'
```

Init:
```javascript
const apiWrapper = new YouCanBookMeApi()
```

Set your credentials:
```javascript
apiWrapper.setCredentials(email, password)
```
Note: here password is the password you set explicitly on your dashboard.


Book:
```javascript
apiWrapper.book(date, firstName, lastName, email)
```
Date is in the following format: 
```
'Y-m-d H:i'
```

# Notes
This is a WIP
Todo: 
- Support more profiles.
- Show availability (there is not api for this right now, support says it's not publicly available because of security reasons). We could, however, scrape the html.
- Get the fields we need to submit a booking to reflect the ones from the dashboard. Right now we only support first name, last name and email
