// src/data/codeData.js

const codeData = [
    {
      id: 1,
      title: "Random Number Generation",
      category: "Function",
      tags: ["Python", "Utility"],
      description:
        "A Python function to generate random numbers using various algorithms.",
      codeSnippets: {
        Python: `import random
  
  def generate_random_numbers(count, lower=0, upper=100):
      return [random.randint(lower, upper) for _ in range(count)]
  
  if __name__ == "__main__":
      numbers = generate_random_numbers(10)
      print("Random Numbers:", numbers)`,
      },
      image: "/code/random_number.png",
      price: "Free", // Thêm trường price
    },
    {
      id: 2,
      title: "Collision Detection",
      category: "Function",
      tags: ["C++", "Game Development"],
      description:
        "Implementing collision detection algorithms in C++ for game development.",
      codeSnippets: {
        Cpp: `#include <iostream>
  #include <cmath>
  
  struct Circle {
      float x, y, radius;
  };
  
  bool areColliding(const Circle& c1, const Circle& c2) {
      float distance = std::sqrt(std::pow(c1.x - c2.x, 2) + std::pow(c1.y - c2.y, 2));
      return distance < (c1.radius + c2.radius);
  }
  
  int main() {
      Circle circle1 = {0.0f, 0.0f, 5.0f};
      Circle circle2 = {3.0f, 4.0f, 5.0f};
      
      if (areColliding(circle1, circle2)) {
          std::cout << "Circles are colliding!" << std::endl;
      } else {
          std::cout << "Circles are not colliding." << std::endl;
      }
      
      return 0;
  }`,
      },
      image: "/code/collision_detection.png",
      price: "Free",
    },
    {
      id: 3,
      title: "AI Behavior System",
      category: "Project",
      tags: ["Python", "AI", "Game Development"],
      description:
        "A complete AI behavior system for game characters using Python.",
      codeSnippets: {
        Python: `# ai_behavior.py
  
  class AICharacter:
      def __init__(self, name):
          self.name = name
          self.state = "idle"
  
      def update(self):
          if self.state == "idle":
              self.patrol()
          elif self.state == "patrol":
              self.chase()
          elif self.state == "chase":
              self.attack()
  
      def patrol(self):
          print(f"{self.name} is patrolling.")
          self.state = "patrol"
  
      def chase(self):
          print(f"{self.name} is chasing the player.")
          self.state = "chase"
  
      def attack(self):
          print(f"{self.name} is attacking the player!")
          self.state = "attack"
  
  if __name__ == "__main__":
      ai = AICharacter("Goblin")
      for _ in range(5):
          ai.update()`,
      },
      image: "/code/ai_behavior.png",
      price: "Free",
    },
    {
      id: 4,
      title: "Pathfinding with A* Algorithm",
      category: "Function",
      tags: ["Python", "Algorithm", "Game Development"],
      description:
        "Implementing the A* pathfinding algorithm in Python for navigating game characters.",
      codeSnippets: {
        Python: `# pathfinding.py
  
  import heapq
  
  def heuristic(a, b):
      return abs(a[0] - b[0]) + abs(a[1] - b[1])
  
  def a_star_search(graph, start, goal):
      queue = []
      heapq.heappush(queue, (0, start))
      came_from = {}
      cost_so_far = {}
      came_from[start] = None
      cost_so_far[start] = 0
  
      while queue:
          _, current = heapq.heappop(queue)
  
          if current == goal:
              break
  
          for neighbor in graph[current]:
              new_cost = cost_so_far[current] + graph[current][neighbor]
              if neighbor not in cost_so_far or new_cost < cost_so_far[neighbor]:
                  cost_so_far[neighbor] = new_cost
                  priority = new_cost + heuristic(goal, neighbor)
                  heapq.heappush(queue, (priority, neighbor))
                  came_from[neighbor] = current
  
      # Reconstruct path
      current = goal
      path = []
      while current != start:
          path.append(current)
          current = came_from.get(current)
          if current is None:
              return None  # No path found
      path.append(start)
      path.reverse()
      return path
  
  if __name__ == "__main__":
      graph = {
          (0, 0): {(1, 0): 1, (0, 1): 1},
          (1, 0): {(1, 1): 1, (2, 0): 1},
          (0, 1): {(1, 1): 1, (0, 2): 1},
          (1, 1): {(2, 1): 1},
          (2, 0): {(2, 1): 1},
          (2, 1): {(2, 2): 1},
          (0, 2): {(1, 2): 1},
          (1, 2): {(2, 2): 1},
          (2, 2): {},
      }
  
      start = (0, 0)
      goal = (2, 2)
      path = a_star_search(graph, start, goal)
      print("Path:", path)`,
      },
      image: "/code/pathfinding.png",
      price: "Free",
    },
    {
      id: 5,
      title: "Inventory Management System",
      category: "Package",
      tags: ["Python", "Package", "Utility"],
      description:
        "A Python package for managing game inventories, including adding, removing, and querying items.",
      codeSnippets: {
        Python: `# inventory/__init__.py
  
  class Inventory:
      def __init__(self):
          self.items = {}
  
      def add_item(self, item_name, quantity=1):
          if item_name in self.items:
              self.items[item_name] += quantity
          else:
              self.items[item_name] = quantity
  
      def remove_item(self, item_name, quantity=1):
          if item_name in self.items:
              self.items[item_name] -= quantity
              if self.items[item_name] <= 0:
                  del self.items[item_name]
  
      def get_inventory(self):
          return self.items
  
  # Usage example
  if __name__ == "__main__":
      inv = Inventory()
      inv.add_item("Sword", 2)
      inv.add_item("Potion", 5)
      inv.remove_item("Potion", 2)
      print("Inventory:", inv.get_inventory())`,
      },
      image: "/code/inventory_management.png",
      price: "Free",
    },
    // Thêm các đoạn mã khác nếu cần
  ];
  
  export default codeData;
  