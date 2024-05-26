from locust import HttpUser, TaskSet, task, between


class UserBehavior(TaskSet):

    @task
    def list_orders(self):
        self.client.get("/orders")

    ## This is problematic
    @task
    def create_order(self):
        order_data = {
            "products": [
                {"name": "testproduct1", "price": 10, "description": "testproduct-locust-1"},
                {"name": "testproduct2", "price": 15, "description": "testproduct-locust-2"},
            ],
            "username": "testuser",
        }
        self.client.post("/orders/create", json=order_data)

    ## This is problematic
    @task
    def delete_order(self):
        # Order ID should be an existing order ID in the database for testing
        order_id = "existing_order_id"
        self.client.delete(f"/orders/{order_id}")

    @task
    def list_users(self):
        self.client.get("/users")

    @task
    def create_user(self):
        user_data = {"name": "testuser", "email": "testuser@example.com"}
        self.client.post("/users/create", json=user_data)

    ## This is problematic
    @task
    def delete_user(self):
        # User ID should be an existing user ID in the database for testing
        user_id = "existing_user_id"
        self.client.delete(f"/users/{user_id}")

    @task
    def get_user_by_name(self):
        # Replace 'testuser' with an existing username in your database for testing
        user_name = "testuser"
        self.client.get(f"/users/{user_name}")

    @task
    def list_products(self):
        self.client.get("/products")

    ## This is problematic
    @task
    def create_product(self):
        product_data = {
            "name": "testproduct",
            "description": "This is a test product",
            "price": 20,
        }
        self.client.post("/products/create", json=product_data)

    ## This is problematic
    @task
    def delete_product(self):
        # Product ID should be an existing product ID in the database for testing
        product_id = "existing_product_id"
        self.client.delete(f"/products/{product_id}")

    @task
    def get_product_by_id(self):
        # Replace 'existing_product_id' with an existing product ID in your database for testing
        product_id = "existing_product_id"
        self.client.get(f"/products/{product_id}")


class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)
    host = "http://35.207.120.101"  # Frontend URL


if __name__ == "__main__":
    import os

    os.system("locust -f locust.py")
