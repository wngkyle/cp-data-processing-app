import matplotlib.pyplot as plt

def main():
  path = '/Users/wng/Desktop'
  x_values = [1, 2, 3, 4, 5]
  y_values = [2, 4, 6, 8, 10]

  # Create the plot
  plt.plot(x_values, y_values)

  # Add title and labels
  plt.title('Simple Line Chart')
  plt.xlabel('X-axis Label')
  plt.ylabel('Y-axis Label')

  # Display the plot
  plt.savefig(path + '/test.png')

main()