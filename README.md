**Note**: *I am submitting the project but I am still working on some of the features.*


## How to run the project

Clone this repository and move into the directory
```shell
git clone https://github.com/chetanpandey1266/MoneyTracker.git
cd MoneyTracker/
```

### To run the backend:

First install all the dependencies
```shell
pip install -r requirements.txt
```

Now to run the backend
```shell
python manage.py runserver
```

**Note**: *The backend will be running on `http://127.0.0.1:8000/`*

### To run the frontend

Move into the frontend folder
```shell
cd frontend/
```

Install all the packages
```shell
npm install
```

Start your app
```shell
npm start
```


***Some of the shortcomings of the project and what I hope to improve further***

* Frontend can be improved a lot. 
* On the frontend side the update in the data should be well synced. For now, we are able to see the changes after a refresh
* The group expense logic is not completed where the user can share the bill among a group of friends