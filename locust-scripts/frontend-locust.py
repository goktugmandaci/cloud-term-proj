from locust import HttpUser, TaskSet, task, between


class UserBehavior(TaskSet):
    
    @task
    def get_frontend_html(self):
        self.client.get("/")

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)
    host = "http://35.207.120.101"


if __name__ == "__main__":
    import os

    os.system("locust -f locust.py")