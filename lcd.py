import sys
import time
import LCD1602


if __name__ == "__main__":
    content = " ".join(sys.argv[1:])
    LCD1602.init(0x27, 1)	# init(slave address, background light)
    LCD1602.write(0, 0, content)
