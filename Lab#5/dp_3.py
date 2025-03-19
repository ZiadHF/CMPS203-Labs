# ContentCreator class (Subject in the Observer Pattern)
class ContentCreator:
    def __init__(self, name):
        self.name = name
        self.followers = []  # List of User objects that follow this creator

    def add_follower(self, user):
        """Add a user to the followers list."""
        self.followers.append(user)

    def remove_follower(self, user):
        """Remove a user from the followers list."""
        if user in self.followers:
            self.followers.remove(user)

    def upload_content(self, content):
        """Notify all followers about the new content."""
        print(f"{self.name} has uploaded new content: {content}")
        notification_manager = NotificationManager.get_instance()
        for follower in self.followers:
            notification_manager.send_notification(follower, self, content)

# User class (Observer in the Observer Pattern)
class User:
    def __init__(self, name):
        self.name = name

    def update(self, content_creator, content):
        """Receive notification of new content from a content creator."""
        print(f"{self.name} received notification: {content_creator.name} uploaded '{content}'")

# NotificationManager class (Singleton)
class NotificationManager:
    _instance = None

    @staticmethod
    def get_instance():
        """Static access method."""
        if NotificationManager._instance is None:
            NotificationManager._instance = NotificationManager()
        return NotificationManager._instance

    def send_notification(self, user, content_creator, content):
        """Send a notification to the user."""
        user.update(content_creator, content)

# Decorator classes for different notification channels
class NotificationChannelDecorator(User):
    """Base class for notification channel decorators."""
    def __init__(self, user):
        self.user = user

    @property
    def name(self):
        """Access the name of the wrapped user."""
        return self.user.name

    def update(self, content_creator, content):
        """Call the update method of the wrapped User object."""
        self.user.update(content_creator, content)

class EmailNotificationDecorator(NotificationChannelDecorator):
    def update(self, content_creator, content):
        """Send email notification in addition to the regular update."""
        super().update(content_creator, content)
        print(f"Email sent to {self.name}: {content_creator.name} uploaded '{content}'")

class SMSNotificationDecorator(NotificationChannelDecorator):
    def update(self, content_creator, content):
        """Send SMS notification in addition to the regular update."""
        super().update(content_creator, content)
        print(f"SMS sent to {self.name}: {content_creator.name} uploaded '{content}'")

class PushNotificationDecorator(NotificationChannelDecorator):
    def update(self, content_creator, content):
        """Send push notification in addition to the regular update."""
        super().update(content_creator, content)
        print(f"Push notification sent to {self.name}: {content_creator.name} uploaded '{content}'")

# Example usage
def main():
    # Creating ContentCreators
    creator1 = ContentCreator("Music Channel")
    creator2 = ContentCreator("Vlog Channel")

    # Creating Users
    user1 = User("Alice")
    user2 = User("Bob")

    # Users follow creators with different notification channels
    # Alice follows creator1 with email notifications
    alice_decorated = EmailNotificationDecorator(user1)
    creator1.add_follower(alice_decorated)

    # Bob follows creator1 with SMS and Push notifications
    bob_sms_decorated = SMSNotificationDecorator(user2)
    bob_push_decorated = PushNotificationDecorator(bob_sms_decorated)
    creator1.add_follower(bob_push_decorated)

    # Alice follows creator2 with regular notifications
    creator2.add_follower(user1)

    # Simulating content upload
    creator1.upload_content("New Song Release!")
    creator2.upload_content("Day in My Life Vlog")

if __name__ == "__main__":
    main()