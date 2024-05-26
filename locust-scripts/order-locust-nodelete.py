from locust import HttpUser, TaskSet, task, between


class UserBehavior(TaskSet):
    
    @task
    def list_orders(self):
        self.client.get("/orders")

    @task
    def create_order(self):
        order_data = {
            "products": [
                {"name": "locust-test-product1", "price": 7, "description": "locust test prod 1"},
                {"name": "locust-test-product2", "price": 41, "description": "locust test prod 2"},
            ],
            "username": "locust-test-user",
        }
        self.client.post("/orders/create", json=order_data)

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)
    host = "https://order-microservice-hwnuitb34a-ey.a.run.app"


if __name__ == "__main__":
    import os

    os.system("locust -f locust.py")