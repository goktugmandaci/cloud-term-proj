from locust import HttpUser, TaskSet, task, between


class UserBehavior(TaskSet):
    
    @task
    def list_users(self):
        self.client.get("/users")

    @task
    def create_user(self):
        user_data = {"name": "testuser", "email": "testuser@example.com"}
        self.client.post("/users/create", json=user_data)


    @task
    def get_user_by_name(self):
        user_name = "testuser"
        self.client.get(f"/users/{user_name}")




class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)
    host = "https://auth-microservice-hwnuitb34a-ey.a.run.app"


if __name__ == "__main__":
    import os

    os.system("locust -f locust.py")