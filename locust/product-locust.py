from locust import HttpUser, TaskSet, task, between


class UserBehavior(TaskSet):
    
    @task
    def list_products(self):
        self.client.get("/products")

    @task
    def create_product(self):
        product_data = {
            "name": "locust-test-product",
            "description": "This is a locust test product",
            "price": 20,
        }
        self.client.post("/products/create", json=product_data)

    @task
    def delete_product(self):
        response = self.client.get("/products")
        products = response.json()
        product_id = products[0]['_id']
        self.client.delete(f"/products/{product_id}")


class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)
    host = "https://product-microservice-hwnuitb34a-ey.a.run.app"


if __name__ == "__main__":
    import os

    os.system("locust -f locust.py")