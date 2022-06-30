var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
define("Boilerplate/Enums/Align", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Align = void 0;
    var Align;
    (function (Align) {
        Align[Align["Default"] = 0] = "Default";
        Align[Align["TopLeft"] = 1] = "TopLeft";
        Align[Align["Top"] = 2] = "Top";
        Align[Align["TopRight"] = 3] = "TopRight";
        Align[Align["Left"] = 4] = "Left";
        Align[Align["Center"] = 5] = "Center";
        Align[Align["Right"] = 6] = "Right";
        Align[Align["BottomLeft"] = 7] = "BottomLeft";
        Align[Align["Bottom"] = 8] = "Bottom";
        Align[Align["BottomRight"] = 9] = "BottomRight";
    })(Align = exports.Align || (exports.Align = {}));
});
define("Boilerplate/Enums/Fonts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Fonts = void 0;
    var Fonts;
    (function (Fonts) {
        Fonts["Arial"] = "Arial";
        Fonts["LucidaConsole"] = "Lucida Console";
        Fonts["Win95"] = "w95fa";
        Fonts["PixelOperator"] = "PixelOperator";
    })(Fonts = exports.Fonts || (exports.Fonts = {}));
});
define("Boilerplate/Classes/Vector2", ["require", "exports", "Boilerplate/Modules/MathHelper"], function (require, exports, MathHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vector2 = void 0;
    var Vector2 = /** @class */ (function () {
        function Vector2(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector2.zero = function () {
            return new Vector2(0, 0);
        };
        Vector2.unitFromAngle = function (angle) {
            return new Vector2(Math.cos(angle), Math.sin(angle));
        };
        Vector2.prototype.clone = function () {
            return new Vector2(this.x, this.y);
        };
        Vector2.prototype.angle = function () {
            return Math.atan2(this.y, this.x);
        };
        Vector2.prototype.add = function (vector2) {
            return new Vector2(this.x + vector2.x, this.y + vector2.y);
        };
        Vector2.prototype.addNumber = function (number) {
            return new Vector2(this.x + number, this.y + number);
        };
        Vector2.prototype.subtract = function (vector2) {
            return new Vector2(this.x - vector2.x, this.y - vector2.y);
        };
        Vector2.prototype.subtractNumber = function (number) {
            return new Vector2(this.x - number, this.y - number);
        };
        Vector2.prototype.multiply = function (vector2) {
            return new Vector2(this.x * vector2.x, this.y * vector2.y);
        };
        Vector2.prototype.multiplyNumber = function (number) {
            return new Vector2(this.x * number, this.y * number);
        };
        Vector2.prototype.divide = function (vector2) {
            return new Vector2(this.x / vector2.x, this.y / vector2.y);
        };
        Vector2.prototype.divideNumber = function (number) {
            return new Vector2(this.x / number, this.y / number);
        };
        Vector2.prototype.distanceSquared = function (position) {
            return Math.pow((this.x - position.x), 2) + Math.pow((this.y - position.y), 2);
        };
        Vector2.prototype.distance = function (position) {
            return Math.sqrt(this.distanceSquared(position));
        };
        Vector2.prototype.intersectsRectangle = function (rectangle) {
            return MathHelper_1.MathHelper.intersectsRectanglePoint(rectangle, this);
        };
        Vector2.prototype.intersectsCircle = function (circle) {
            return MathHelper_1.MathHelper.intersectsCirclePoint(circle, this);
        };
        return Vector2;
    }());
    exports.Vector2 = Vector2;
});
define("Boilerplate/Classes/Rectangle", ["require", "exports", "Boilerplate/Modules/MathHelper", "Boilerplate/Classes/Vector2"], function (require, exports, MathHelper_2, Vector2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rectangle = void 0;
    var Rectangle = /** @class */ (function () {
        function Rectangle(position, size) {
            this.position = position;
            this.size = size;
        }
        Rectangle.zero = function () {
            return new Rectangle(Vector2_1.Vector2.zero(), Vector2_1.Vector2.zero());
        };
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.position.clone(), this.size.clone());
        };
        Rectangle.prototype.intersectsPoint = function (point) {
            return MathHelper_2.MathHelper.intersectsRectanglePoint(this, point);
        };
        Rectangle.prototype.intersectsCircle = function (circle) {
            return MathHelper_2.MathHelper.intersectsCircleRectangle(circle, this);
        };
        Rectangle.prototype.top = function () {
            return this.position.y;
        };
        Rectangle.prototype.bottom = function () {
            return this.position.y + this.size.y;
        };
        Rectangle.prototype.left = function () {
            return this.position.x;
        };
        Rectangle.prototype.right = function () {
            return this.position.x + this.size.x;
        };
        Rectangle.prototype.center = function () {
            return this.position.add(this.size.divideNumber(2));
        };
        Rectangle.prototype.topLeft = function () {
            return this.position;
        };
        Rectangle.prototype.topRight = function () {
            return this.position.add(new Vector2_1.Vector2(this.size.x, 0));
        };
        Rectangle.prototype.bottomLeft = function () {
            return this.position.add(new Vector2_1.Vector2(0, this.size.y));
        };
        Rectangle.prototype.bottomRight = function () {
            return this.position.add(new Vector2_1.Vector2(this.size.x, this.size.y));
        };
        Rectangle.prototype.topCenter = function () {
            return this.center().subtract(new Vector2_1.Vector2(0, this.size.y / 2));
        };
        Rectangle.prototype.bottomCenter = function () {
            return this.center().add(new Vector2_1.Vector2(0, this.size.y / 2));
        };
        Rectangle.prototype.leftCenter = function () {
            return this.center().subtract(new Vector2_1.Vector2(this.size.x / 2, 0));
        };
        Rectangle.prototype.rightCenter = function () {
            return this.center().add(new Vector2_1.Vector2(this.size.x / 2, 0));
        };
        Rectangle.prototype.offset = function (offset) {
            return new Rectangle(this.position.add(offset), this.size);
        };
        return Rectangle;
    }());
    exports.Rectangle = Rectangle;
});
define("Boilerplate/Modules/MathHelper", ["require", "exports", "Boilerplate/Classes/Vector2"], function (require, exports, Vector2_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MathHelper = void 0;
    var MathHelper;
    (function (MathHelper) {
        function intersectsRectanglePoint(rectangle, point) {
            return point.x >= rectangle.position.x
                && point.x <= rectangle.position.x + rectangle.size.x
                && point.y >= rectangle.position.y
                && point.y <= rectangle.position.y + rectangle.size.y;
        }
        MathHelper.intersectsRectanglePoint = intersectsRectanglePoint;
        function intersectsCirclePoint(circle, point) {
            return circle.position.distanceSquared(point) <= Math.pow(circle.radius, 2);
        }
        MathHelper.intersectsCirclePoint = intersectsCirclePoint;
        function intersectsCircleRectangle(circle, rectangle) {
            return new Vector2_2.Vector2(Math.max(rectangle.left(), Math.min(rectangle.right(), circle.position.x)), Math.max(rectangle.top(), Math.min(rectangle.bottom(), circle.position.y)))
                .distanceSquared(circle.position) <= Math.pow(circle.radius, 2);
        }
        MathHelper.intersectsCircleRectangle = intersectsCircleRectangle;
        function randomInt(lower, upper) {
            var difference = (upper + 1) - lower;
            var random = Math.random() * difference;
            return Math.ceil(random + lower) - 1;
        }
        MathHelper.randomInt = randomInt;
    })(MathHelper = exports.MathHelper || (exports.MathHelper = {}));
});
define("Boilerplate/Classes/Circle", ["require", "exports", "Boilerplate/Modules/MathHelper", "Boilerplate/Classes/Vector2"], function (require, exports, MathHelper_3, Vector2_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Circle = void 0;
    var Circle = /** @class */ (function () {
        function Circle(position, radius) {
            this.position = position;
            this.radius = radius;
        }
        Circle.zero = function () {
            return new Circle(Vector2_3.Vector2.zero(), 0);
        };
        Circle.prototype.clone = function () {
            return new Circle(this.position.clone(), this.radius);
        };
        Circle.prototype.intersectsPoint = function (point) {
            return MathHelper_3.MathHelper.intersectsCirclePoint(this, point);
        };
        Circle.prototype.intersectsRectangle = function (rectangle) {
            return MathHelper_3.MathHelper.intersectsCircleRectangle(this, rectangle);
        };
        return Circle;
    }());
    exports.Circle = Circle;
});
define("Boilerplate/Classes/Colour", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Colour = void 0;
    var Colour = /** @class */ (function () {
        function Colour(r, g, b) {
            this.r = Math.round(this.boundValue(r));
            this.g = Math.round(this.boundValue(g));
            this.b = Math.round(this.boundValue(b));
            this.setHexString();
        }
        Colour.prototype.getR = function () { return this.r; };
        Colour.prototype.getG = function () { return this.g; };
        Colour.prototype.getB = function () { return this.b; };
        Colour.prototype.getHexString = function () { return this.hexString; };
        Colour.prototype.setHexString = function () {
            var rHex = this.r.toString(16);
            var gHex = this.g.toString(16);
            var bHex = this.b.toString(16);
            this.hexString = '#';
            if (rHex.length === 1)
                this.hexString += '0';
            this.hexString += rHex;
            if (gHex.length === 1)
                this.hexString += '0';
            this.hexString += gHex;
            if (bHex.length === 1)
                this.hexString += '0';
            this.hexString += bHex;
        };
        Colour.prototype.boundValue = function (value) {
            if (value < 0)
                return 0;
            if (value > 255)
                return 255;
            return value;
        };
        Colour.prototype.multiply = function (number) {
            return new Colour(this.r * number, this.g * number, this.b * number);
        };
        Colour.prototype.add = function (number) {
            return new Colour(this.r + number, this.g + number, this.b + number);
        };
        Colour.black = new Colour(0, 0, 0);
        Colour.white = new Colour(255, 255, 255);
        Colour.red = new Colour(255, 0, 0);
        Colour.yellow = new Colour(255, 255, 0);
        Colour.green = new Colour(0, 255, 0);
        Colour.cyan = new Colour(0, 255, 255);
        Colour.blue = new Colour(0, 0, 255);
        Colour.magenta = new Colour(255, 0, 255);
        return Colour;
    }());
    exports.Colour = Colour;
});
define("Boilerplate/Classes/Context2D", ["require", "exports", "Boilerplate/Enums/Align", "Boilerplate/Classes/Vector2"], function (require, exports, Align_1, Vector2_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    HTMLCanvasElement.prototype.getContext2D = function () {
        return this.getContext('2d');
    };
    CanvasRenderingContext2D.prototype.drawString = function (text, position, size, font, colour, align) {
        this.fillStyle = colour.getHexString();
        this.setFont(font, size);
        this.setAlign(align);
        this.fillText(text, position.x, position.y);
    };
    CanvasRenderingContext2D.prototype.measureString = function (text, size, font, align) {
        this.setFont(font, size);
        this.setAlign(align);
        return this.measureText(text);
    };
    CanvasRenderingContext2D.prototype.drawFillRectangle = function (rectangle, colour) {
        this.fillStyle = colour.getHexString();
        this.fillRect(rectangle.position.x, rectangle.position.y, rectangle.size.x, rectangle.size.y);
    };
    CanvasRenderingContext2D.prototype.drawStrokeRectangle = function (rectangle, colour, lineWidth) {
        if (lineWidth === void 0) { lineWidth = 2; }
        this.strokeStyle = colour.getHexString();
        this.lineWidth = lineWidth;
        this.strokeRect(rectangle.position.x, rectangle.position.y, rectangle.size.x, rectangle.size.y);
    };
    CanvasRenderingContext2D.prototype.drawBorderedRectangle = function (rectangle, fillColour, borderColour, lineWidth) {
        if (lineWidth === void 0) { lineWidth = 2; }
        this.drawFillRectangle(rectangle, fillColour);
        this.drawStrokeRectangle(rectangle, borderColour, lineWidth);
    };
    CanvasRenderingContext2D.prototype.drawFillCircle = function (circle, colour) {
        this.fillStyle = colour.getHexString();
        this.beginPath();
        this.ellipse(circle.position.x, circle.position.y, circle.radius, circle.radius, 0, 0, 2 * Math.PI);
        this.fill();
    };
    CanvasRenderingContext2D.prototype.drawStrokeCircle = function (circle, colour, lineWidth) {
        this.strokeStyle = colour.getHexString();
        this.lineWidth = lineWidth;
        this.beginPath();
        this.ellipse(circle.position.x, circle.position.y, circle.radius, circle.radius, 0, 0, 2 * Math.PI);
        this.stroke();
    };
    CanvasRenderingContext2D.prototype.drawBorderedCircle = function (circle, fillColour, borderColour, lineWidth) {
        if (lineWidth === void 0) { lineWidth = 2; }
        this.drawFillCircle(circle.position, circle.radius, fillColour);
        this.drawStrokeCircle(circle.position, circle.radius, borderColour, lineWidth);
    };
    CanvasRenderingContext2D.prototype.setAlign = function (align) {
        if (align === Align_1.Align.Bottom
            || align === Align_1.Align.BottomLeft
            || align === Align_1.Align.BottomRight)
            this.textBaseline = "bottom";
        else if (align === Align_1.Align.Top
            || align === Align_1.Align.TopLeft
            || align === Align_1.Align.TopRight)
            this.textBaseline = "top";
        else
            this.textBaseline = "middle";
        if (align === Align_1.Align.Left
            || align === Align_1.Align.TopLeft
            || align === Align_1.Align.BottomLeft)
            this.textAlign = "left";
        else if (align === Align_1.Align.Right
            || align === Align_1.Align.TopRight
            || align === Align_1.Align.BottomRight)
            this.textAlign = "right";
        else
            this.textAlign = "center";
    };
    CanvasRenderingContext2D.prototype.setFont = function (font, size) {
        this.font = size + "px " + font;
    };
    CanvasRenderingContext2D.prototype.drawImageRectangle = function (image, rectangle) {
        this.drawImage(image, rectangle.position.x, rectangle.position.y, rectangle.size.x, rectangle.size.y);
    };
    CanvasRenderingContext2D.prototype.getCanvasSize = function () {
        return new Vector2_4.Vector2(this.canvas.width, this.canvas.height);
    };
});
define("Boilerplate/Classes/Images", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Images = void 0;
    var Images = /** @class */ (function () {
        function Images() {
            this.imagesRecord = {};
        }
        Images.prototype.loadImages = function (enumType) {
            var _this = this;
            var imageDiv = document.getElementById('images');
            Object.keys(enumType).map(function (x) { return enumType[x]; }).forEach(function (imageName) {
                var image = new Image();
                image.src = 'images/' + imageName + '.png';
                image.width = 64;
                image.height = 64;
                imageDiv.append(image);
                _this.imagesRecord[imageName] = image;
            });
        };
        Images.prototype.getImage = function (imageName) {
            return this.imagesRecord[imageName];
        };
        return Images;
    }());
    exports.Images = Images;
});
define("Boilerplate/Enums/MouseButton", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MouseButton = void 0;
    var MouseButton;
    (function (MouseButton) {
        MouseButton[MouseButton["Left"] = 0] = "Left";
        MouseButton[MouseButton["Middle"] = 1] = "Middle";
        MouseButton[MouseButton["Right"] = 2] = "Right";
        MouseButton[MouseButton["Back"] = 3] = "Back";
        MouseButton[MouseButton["Forward"] = 4] = "Forward";
    })(MouseButton = exports.MouseButton || (exports.MouseButton = {}));
});
define("Boilerplate/Enums/Scroll", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scroll = void 0;
    var Scroll;
    (function (Scroll) {
        Scroll[Scroll["None"] = 1] = "None";
        Scroll[Scroll["Up"] = 2] = "Up";
        Scroll[Scroll["Down"] = 3] = "Down";
    })(Scroll = exports.Scroll || (exports.Scroll = {}));
});
define("Boilerplate/Classes/MouseState", ["require", "exports", "Boilerplate/Enums/Scroll", "Boilerplate/Classes/Vector2"], function (require, exports, Scroll_1, Vector2_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MouseState = void 0;
    var MouseState = /** @class */ (function () {
        function MouseState() {
            this.position = Vector2_5.Vector2.zero();
            this.scroll = Scroll_1.Scroll.None;
            this.buttonDown = {};
            this.unusedClick = {};
            this.unusedDown = {};
        }
        MouseState.prototype.isButtonDown = function (mouseButton) {
            return this.buttonDown[mouseButton] === true;
        };
        MouseState.prototype.isButtonUp = function (mouseButton) {
            return !this.isButtonDown(mouseButton);
        };
        MouseState.prototype.hasUnusedClick = function (mouseButton) {
            return this.unusedClick[mouseButton] === true;
        };
        MouseState.prototype.hasUnusedDown = function (mouseButton) {
            return this.unusedDown[mouseButton] === true;
        };
        MouseState.prototype.setClickUsed = function (mouseButton) {
            this.unusedClick[mouseButton] = false;
        };
        MouseState.prototype.setDownUsed = function (mouseButton) {
            this.unusedDown[mouseButton] = false;
        };
        MouseState.prototype.clone = function () {
            var clone = new MouseState();
            clone.position = this.position.clone();
            clone.scroll = this.scroll;
            clone.buttonDown = Object.assign({}, this.buttonDown);
            clone.unusedClick = Object.assign({}, this.unusedClick);
            clone.unusedDown = Object.assign({}, this.unusedDown);
            return clone;
        };
        return MouseState;
    }());
    exports.MouseState = MouseState;
});
define("Boilerplate/Enums/Keys", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Keys = void 0;
    var Keys;
    (function (Keys) {
        // Rotate = "KeyR"
    })(Keys = exports.Keys || (exports.Keys = {}));
});
define("Boilerplate/Classes/KeyboardState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KeyboardState = void 0;
    var KeyboardState = /** @class */ (function () {
        function KeyboardState() {
            this.keyStates = {};
        }
        KeyboardState.prototype.isKeyDown = function (key) {
            return this.keyStates[key] === true;
        };
        KeyboardState.prototype.isKeyUp = function (key) {
            return !this.isKeyDown(key);
        };
        KeyboardState.prototype.setKeyDown = function (key) {
            this.keyStates[key] = true;
        };
        KeyboardState.prototype.setKeyUp = function (key) {
            this.keyStates[key] = false;
        };
        return KeyboardState;
    }());
    exports.KeyboardState = KeyboardState;
});
define("Boilerplate/Classes/Input", ["require", "exports", "Boilerplate/Classes/MouseState", "Boilerplate/Enums/Scroll", "Boilerplate/Classes/KeyboardState"], function (require, exports, MouseState_1, Scroll_2, KeyboardState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Input = void 0;
    var Input = /** @class */ (function () {
        function Input(canvas) {
            var _this = this;
            this.previousMouseState = new MouseState_1.MouseState();
            this.currentMouseState = new MouseState_1.MouseState();
            this.runningMouseState = new MouseState_1.MouseState();
            this.previousKeyboardState = new KeyboardState_1.KeyboardState();
            this.currentKeyboardState = new KeyboardState_1.KeyboardState();
            this.runningKeyboardState = new KeyboardState_1.KeyboardState();
            canvas.addEventListener('mousedown', function (event) {
                _this.runningMouseState.buttonDown[event.button] = true;
                _this.runningMouseState.unusedDown[event.button] = true;
            });
            canvas.addEventListener('mouseup', function (event) {
                _this.runningMouseState.buttonDown[event.button] = false;
                _this.runningMouseState.unusedClick[event.button] = true;
            });
            canvas.addEventListener('mousemove', function (event) {
                var target = event.currentTarget;
                var rect = target.getBoundingClientRect();
                _this.runningMouseState.position.x = event.clientX - rect.left;
                _this.runningMouseState.position.y = event.clientY - rect.top;
            });
            canvas.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
            canvas.addEventListener('wheel', function (event) {
                if (event.deltaY < 0)
                    _this.runningMouseState.scroll = Scroll_2.Scroll.Up;
                else if (event.deltaY > 0)
                    _this.runningMouseState.scroll = Scroll_2.Scroll.Down;
            });
            window.addEventListener('keydown', function (event) {
                _this.runningKeyboardState.setKeyDown(event.code);
            });
            window.addEventListener('keyup', function (event) {
                _this.runningKeyboardState.setKeyUp(event.code);
            });
        }
        Input.prototype.update = function () {
            //Update mouse states
            this.previousMouseState = this.currentMouseState;
            this.currentMouseState = this.runningMouseState.clone();
            this.runningMouseState.scroll = Scroll_2.Scroll.None;
            this.runningMouseState.unusedClick = {};
            this.runningMouseState.unusedDown = {};
            //Update keyboard states
            this.previousKeyboardState = this.currentKeyboardState;
            this.currentKeyboardState = this.runningKeyboardState;
            this.runningKeyboardState = new KeyboardState_1.KeyboardState();
        };
        Input.prototype.getMousePosition = function () {
            return this.currentMouseState.position;
        };
        Input.prototype.getMouseScroll = function () {
            return this.currentMouseState.scroll;
        };
        Input.prototype.isButtonUp = function (mouseButton) {
            return this.currentMouseState.isButtonUp(mouseButton);
        };
        Input.prototype.isButtonDown = function (mouseButton) {
            return this.currentMouseState.isButtonDown(mouseButton);
        };
        Input.prototype.isButtonStartOfClick = function (mouseButton) {
            return this.currentMouseState.isButtonDown(mouseButton) && this.previousMouseState.isButtonUp(mouseButton);
        };
        Input.prototype.isButtonEndOfClick = function (mouseButton) {
            return this.currentMouseState.isButtonUp(mouseButton) && this.previousMouseState.isButtonDown(mouseButton);
        };
        Input.prototype.hasUnusedClick = function (mouseButton) {
            return this.currentMouseState.hasUnusedClick(mouseButton);
        };
        Input.prototype.setClickUsed = function (mouseButton) {
            this.currentMouseState.setClickUsed(mouseButton);
        };
        Input.prototype.hasUnusedDown = function (mouseButton) {
            return this.currentMouseState.hasUnusedDown(mouseButton);
        };
        Input.prototype.setDownUsed = function (mouseButton) {
            this.currentMouseState.setDownUsed(mouseButton);
        };
        Input.prototype.isKeyDown = function (key) {
            return this.currentKeyboardState.isKeyDown(key);
        };
        return Input;
    }());
    exports.Input = Input;
});
define("Boilerplate/Classes/GameBase", ["require", "exports", "Boilerplate/Classes/Images", "Boilerplate/Classes/Input"], function (require, exports, Images_1, Input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameBase = void 0;
    var GameBase = /** @class */ (function () {
        function GameBase(enumType) {
            var _this = this;
            this.images = new Images_1.Images();
            this.images.loadImages(enumType);
            this.canvas = document.getElementById('gameCanvas');
            this.context = this.canvas.getContext2D();
            this.context.imageSmoothingEnabled = false;
            this.input = new Input_1.Input(this.canvas);
            this.updateWindowSize();
            window.addEventListener('resize', function () { return _this.updateWindowSize(); });
        }
        GameBase.prototype.run = function () {
            this.initialize();
            this.startUpdating();
            this.startDrawing();
        };
        GameBase.prototype.baseUpdate = function () {
            this.input.update();
            this.update();
        };
        GameBase.prototype.baseDraw = function () {
            this.context.clearRect(0, 0, this.windowWidth, this.windowHeight);
            this.draw();
        };
        GameBase.prototype.startUpdating = function () {
            var _this = this;
            setInterval(function () { return _this.baseUpdate(); }, GameBase.updateInterval);
        };
        GameBase.prototype.startDrawing = function () {
            var _this = this;
            setInterval(function () { return _this.baseDraw(); }, GameBase.drawInterval);
        };
        GameBase.prototype.updateWindowSize = function () {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            this.context.imageSmoothingEnabled = false;
        };
        GameBase.updatesPerSecond = 60;
        GameBase.drawsPerSecond = 60;
        GameBase.updateInterval = 1000 / 60;
        GameBase.drawInterval = 1000 / 60;
        GameBase.updateTime = 1 / 60;
        GameBase.drawTime = 1 / 60;
        return GameBase;
    }());
    exports.GameBase = GameBase;
});
define("Game/Enums/ImageNames", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageNames = void 0;
    var ImageNames;
    (function (ImageNames) {
        ImageNames["MissingImage"] = "MissingImage";
        ImageNames["Start"] = "Start";
        ImageNames["Application"] = "Application";
        ImageNames["Wallet"] = "Wallet";
        ImageNames["Close"] = "Close";
        ImageNames["CryptCoinMiner"] = "CryptCoinMiner";
        ImageNames["ProgramShop"] = "ProgramShop";
        ImageNames["Hackinator"] = "Hackinator";
    })(ImageNames = exports.ImageNames || (exports.ImageNames = {}));
});
define("Game/Enums/Programs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Programs = void 0;
    var Programs;
    (function (Programs) {
        Programs[Programs["Wallet"] = 1] = "Wallet";
        Programs[Programs["CryptCoinMiner"] = 2] = "CryptCoinMiner";
        Programs[Programs["ProgramShop"] = 3] = "ProgramShop";
        Programs[Programs["Hackinator"] = 4] = "Hackinator";
    })(Programs = exports.Programs || (exports.Programs = {}));
});
define("Game/Modules/GameColour", ["require", "exports", "Boilerplate/Classes/Colour"], function (require, exports, Colour_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameColour = void 0;
    var GameColour;
    (function (GameColour) {
        GameColour.background = new Colour_1.Colour(0, 128, 128);
        GameColour.greyscale0 = new Colour_1.Colour(0, 0, 0);
        GameColour.greyscale50 = new Colour_1.Colour(128, 128, 128);
        GameColour.greyscale75 = new Colour_1.Colour(192, 192, 192);
        GameColour.greyscale87 = new Colour_1.Colour(224, 224, 224);
        GameColour.greyscale100 = new Colour_1.Colour(255, 255, 255);
        GameColour.selected = new Colour_1.Colour(0, 0, 128);
        GameColour.selectedText = new Colour_1.Colour(255, 255, 255);
        GameColour.focusedWindowTitleRectangle = new Colour_1.Colour(0, 0, 128);
        GameColour.focusedWindowTitleText = new Colour_1.Colour(255, 255, 255);
        GameColour.unfocusedWindowTitleRectangle = new Colour_1.Colour(128, 128, 128);
        GameColour.unfocusedWindowTitleText = new Colour_1.Colour(192, 192, 192);
        GameColour.text = new Colour_1.Colour(0, 0, 0);
        GameColour.textDisabled = new Colour_1.Colour(128, 128, 128);
        GameColour.textConsole = new Colour_1.Colour(0, 255, 0);
    })(GameColour = exports.GameColour || (exports.GameColour = {}));
});
define("Game/Classes/Panel", ["require", "exports", "Boilerplate/Classes/Rectangle", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Boilerplate/Enums/MouseButton", "Game/Enums/ImageNames", "Game/Modules/GameColour"], function (require, exports, Rectangle_1, Vector2_6, Align_2, Fonts_1, MouseButton_1, ImageNames_1, GameColour_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Panel = void 0;
    var Panel = /** @class */ (function () {
        function Panel(program, name, icon, panelPosition, panelSize, images) {
            var _this = this;
            this.program = program;
            this.name = name;
            this.icon = icon;
            this.toClose = false;
            this.toFocus = false;
            this.hasFocus = false;
            this.isDragging = false;
            this.dragOffset = Vector2_6.Vector2.zero();
            this.getToFocus = function () { return _this.toFocus; };
            this.getHasFocus = function () { return _this.hasFocus; };
            this.setFocus = function (focus) { return _this.hasFocus = focus; };
            this.panelOuterRectangle1 = new Rectangle_1.Rectangle(panelPosition, panelSize.add(new Vector2_6.Vector2(16, 56)));
            this.panelOuterRectangle2 = new Rectangle_1.Rectangle(panelPosition, panelSize.add(new Vector2_6.Vector2(14, 54)));
            this.panelOuterRectangle3 = new Rectangle_1.Rectangle(panelPosition.addNumber(2), panelSize.add(new Vector2_6.Vector2(12, 52)));
            this.panelOuterRectangle4 = new Rectangle_1.Rectangle(panelPosition.addNumber(2), panelSize.add(new Vector2_6.Vector2(10, 50)));
            this.panelOuterRectangle5 = new Rectangle_1.Rectangle(panelPosition.addNumber(4), panelSize.add(new Vector2_6.Vector2(8, 48)));
            this.panelTitleRectangle = new Rectangle_1.Rectangle(panelPosition.addNumber(8), new Vector2_6.Vector2(panelSize.x, 36));
            this.panelInnerRectangle = new Rectangle_1.Rectangle(panelPosition.add(new Vector2_6.Vector2(8, 48)), panelSize);
            this.closeButtonRectangle1 = new Rectangle_1.Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(36, 32)), new Vector2_6.Vector2(32, 28));
            this.closeButtonRectangle2 = new Rectangle_1.Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(36, 32)), new Vector2_6.Vector2(30, 26));
            this.closeButtonRectangle3 = new Rectangle_1.Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(34, 30)), new Vector2_6.Vector2(28, 24));
            this.closeButtonRectangle4 = new Rectangle_1.Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(34, 30)), new Vector2_6.Vector2(26, 22));
            this.closeButtonRectangle5 = new Rectangle_1.Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(32, 28)), new Vector2_6.Vector2(24, 20));
            this.closeImage = images.getImage(ImageNames_1.ImageNames.Close);
        }
        Panel.prototype.update = function (input) {
            this.toFocus = false;
            this.updatePanel(this.panelInnerRectangle);
            this.toFocus = input.isButtonStartOfClick(MouseButton_1.MouseButton.Left)
                && input.getMousePosition().intersectsRectangle(this.panelOuterRectangle1);
            if (input.hasUnusedClick(MouseButton_1.MouseButton.Left)) {
                if (input.getMousePosition().intersectsRectangle(this.closeButtonRectangle1)) {
                    this.toClose = true;
                    input.setClickUsed(MouseButton_1.MouseButton.Left);
                }
                else if (input.getMousePosition().intersectsRectangle(this.panelOuterRectangle1)) {
                    input.setClickUsed(MouseButton_1.MouseButton.Left);
                }
            }
            if (input.hasUnusedDown(MouseButton_1.MouseButton.Left)
                && input.getMousePosition().intersectsRectangle(this.panelTitleRectangle)
                && !input.getMousePosition().intersectsRectangle(this.closeButtonRectangle1)) {
                this.isDragging = true;
                this.dragOffset = input.getMousePosition().subtract(this.panelOuterRectangle1.position);
                this.toFocus = true;
                input.setDownUsed(MouseButton_1.MouseButton.Left);
            }
            else if (this.isDragging) {
                this.updatePosition(input.getMousePosition().subtract(this.dragOffset));
                if (input.isButtonEndOfClick(MouseButton_1.MouseButton.Left)) {
                    this.isDragging = false;
                }
            }
        };
        Panel.prototype.draw = function (context) {
            context.drawFillRectangle(this.panelOuterRectangle1, GameColour_1.GameColour.greyscale0);
            context.drawFillRectangle(this.panelOuterRectangle2, GameColour_1.GameColour.greyscale87);
            context.drawFillRectangle(this.panelOuterRectangle3, GameColour_1.GameColour.greyscale50);
            context.drawFillRectangle(this.panelOuterRectangle4, GameColour_1.GameColour.greyscale100);
            context.drawFillRectangle(this.panelOuterRectangle5, GameColour_1.GameColour.greyscale75);
            context.drawFillRectangle(this.panelTitleRectangle, this.hasFocus ? GameColour_1.GameColour.focusedWindowTitleRectangle : GameColour_1.GameColour.unfocusedWindowTitleRectangle);
            context.drawFillRectangle(this.closeButtonRectangle1, GameColour_1.GameColour.greyscale0);
            context.drawFillRectangle(this.closeButtonRectangle2, GameColour_1.GameColour.greyscale100);
            context.drawFillRectangle(this.closeButtonRectangle3, GameColour_1.GameColour.greyscale50);
            context.drawFillRectangle(this.closeButtonRectangle4, GameColour_1.GameColour.greyscale87);
            context.drawFillRectangle(this.closeButtonRectangle5, GameColour_1.GameColour.greyscale75);
            context.drawImageRectangle(this.icon, new Rectangle_1.Rectangle(this.panelTitleRectangle.position.add(new Vector2_6.Vector2(4, 2)), new Vector2_6.Vector2(32, 32)));
            context.drawString(this.name, this.panelTitleRectangle.leftCenter().add(new Vector2_6.Vector2(42, 0)), 32, Fonts_1.Fonts.PixelOperator, this.hasFocus ? GameColour_1.GameColour.focusedWindowTitleText : GameColour_1.GameColour.unfocusedWindowTitleText, Align_2.Align.Left);
            context.drawImageRectangle(this.closeImage, new Rectangle_1.Rectangle(this.closeButtonRectangle5.position.add(new Vector2_6.Vector2(4, 2)), new Vector2_6.Vector2(16, 14)));
            context.save();
            context.beginPath();
            context.rect(this.panelInnerRectangle.position.x, this.panelInnerRectangle.position.y, this.panelInnerRectangle.size.x, this.panelInnerRectangle.size.y);
            context.clip();
            this.drawPanel(context, this.panelInnerRectangle);
            context.restore();
        };
        Panel.prototype.updatePosition = function (position) {
            this.panelInnerRectangle.position = position.add(new Vector2_6.Vector2(8, 48));
            this.panelOuterRectangle1.position = position;
            this.panelOuterRectangle2.position = position;
            this.panelOuterRectangle3.position = position.addNumber(2);
            this.panelOuterRectangle4.position = position.addNumber(2);
            this.panelOuterRectangle5.position = position.addNumber(4);
            this.panelTitleRectangle.position = position.addNumber(8);
            this.closeButtonRectangle1.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(36, 32));
            this.closeButtonRectangle2.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(36, 32));
            this.closeButtonRectangle3.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(34, 30));
            this.closeButtonRectangle4.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(34, 30));
            this.closeButtonRectangle5.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2_6.Vector2(32, 28));
        };
        Panel.prototype.getToClose = function () {
            return this.toClose;
        };
        return Panel;
    }());
    exports.Panel = Panel;
});
define("Game/Classes/Resources", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Resources = void 0;
    var Resources = /** @class */ (function () {
        function Resources() {
            this.money = 10;
            this.cryptCoinMinerAlgorithmLevel = 1;
            this.cryptCoinMinerHashLevel = 1;
            this.cryptCoinMinerCpuLevel = 1;
            this.cryptCoinMinerParallelLevel = 1;
            this.cryptCoinMinerSeedLevel = 1;
            this.hackinatorPasswordCrackerLevel = 1;
            this.hackinatorSqlInjectionLevel = 1;
            this.hackinatorKeyDecryptor = 1;
            this.hackinatorBotnetLevel = 1;
            this.hackinatorRansomwareLevel = 1;
            this.programCryptCoinMinerUnlocked = false;
            this.programHackinatorUnlocked = false;
        }
        return Resources;
    }());
    exports.Resources = Resources;
});
define("Game/Classes/TextButton", ["require", "exports", "Boilerplate/Classes/Rectangle", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Boilerplate/Enums/MouseButton", "Game/Modules/GameColour"], function (require, exports, Rectangle_2, Align_3, Fonts_2, MouseButton_2, GameColour_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextButton = void 0;
    var TextButton = /** @class */ (function () {
        function TextButton(text, rectangle, onClick, enabled, onEnable, onDisable) {
            if (enabled === void 0) { enabled = true; }
            this.text = text;
            this.rectangle = rectangle;
            this.onClick = onClick;
            this.enabled = enabled;
            this.onEnable = onEnable;
            this.onDisable = onDisable;
        }
        TextButton.prototype.setIsEnabled = function () {
            this.isEnabled = typeof this.enabled === "boolean" ? this.enabled : this.enabled();
            if (this.isEnabled) {
                if (this.onEnable != null) {
                    this.onEnable();
                }
            }
            else {
                if (this.onDisable != null) {
                    this.onDisable();
                }
            }
        };
        TextButton.prototype.update = function (input, offset) {
            this.setIsEnabled();
            if (this.isEnabled && input.hasUnusedClick(MouseButton_2.MouseButton.Left) && input.getMousePosition().intersectsRectangle(new Rectangle_2.Rectangle(offset.add(this.rectangle.position), this.rectangle.size.addNumber(8)))) {
                input.setClickUsed(MouseButton_2.MouseButton.Left);
                this.onClick();
            }
        };
        TextButton.prototype.draw = function (context, offset) {
            context.drawFillRectangle(new Rectangle_2.Rectangle(offset.add(this.rectangle.position), this.rectangle.size.addNumber(8)), GameColour_2.GameColour.greyscale0);
            context.drawFillRectangle(new Rectangle_2.Rectangle(offset.add(this.rectangle.position), this.rectangle.size.addNumber(6)), GameColour_2.GameColour.greyscale100);
            context.drawFillRectangle(new Rectangle_2.Rectangle(offset.add(this.rectangle.position).addNumber(2), this.rectangle.size.addNumber(4)), GameColour_2.GameColour.greyscale50);
            context.drawFillRectangle(new Rectangle_2.Rectangle(offset.add(this.rectangle.position).addNumber(2), this.rectangle.size.addNumber(2)), GameColour_2.GameColour.greyscale100);
            context.drawFillRectangle(new Rectangle_2.Rectangle(offset.add(this.rectangle.position).addNumber(4), this.rectangle.size), GameColour_2.GameColour.greyscale75);
            context.drawString(this.text, offset.add(this.rectangle.center().addNumber(4)), 32, Fonts_2.Fonts.PixelOperator, this.isEnabled ? GameColour_2.GameColour.text : GameColour_2.GameColour.textDisabled, Align_3.Align.Center);
        };
        return TextButton;
    }());
    exports.TextButton = TextButton;
});
define("Game/Functions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.numberWithPostfix = void 0;
    var exponentSymbols = [
        "K",
        "M",
        "B",
        "T",
        "Qa",
        "Qi",
        "Sx",
        "Sp",
        "Oc",
        "No",
        "Dc",
    ];
    function numberWithPostfix(num) {
        var split = num.toExponential(3).split("e");
        var exponentNumber = split[0];
        var exponent = parseInt(split[1].replace("+", ""));
        var index = Math.floor(exponent / 3);
        if (index <= 0) {
            return num.toFixed(2);
        }
        if (index > exponentSymbols.length) {
            return exponentNumber + "e" + exponent;
        }
        var numWithTrail = (num / Math.pow(10, (index) * 3)).toFixed(3).substring(0, 4);
        while (numWithTrail.endsWith('0')) {
            numWithTrail = numWithTrail.substring(0, numWithTrail.length - 1);
        }
        if (numWithTrail.endsWith('.')) {
            numWithTrail = numWithTrail.substring(0, numWithTrail.length - 1);
        }
        return numWithTrail + exponentSymbols[index - 1];
    }
    exports.numberWithPostfix = numberWithPostfix;
});
define("Game/Classes/CryptCoinMinerPanel", ["require", "exports", "Boilerplate/Classes/Rectangle", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Game/Enums/ImageNames", "Game/Enums/Programs", "Game/Modules/GameColour", "Game/Classes/Panel", "Game/Classes/TextButton", "Boilerplate/Modules/MathHelper", "Boilerplate/Classes/GameBase", "Game/Functions"], function (require, exports, Rectangle_3, Vector2_7, Align_4, Fonts_3, ImageNames_2, Programs_1, GameColour_3, Panel_1, TextButton_1, MathHelper_4, GameBase_1, Functions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CryptCoinMinerPanel = void 0;
    var CryptCoinMinerPanel = /** @class */ (function (_super) {
        __extends(CryptCoinMinerPanel, _super);
        function CryptCoinMinerPanel(images, resources, input) {
            var _this = _super.call(this, Programs_1.Programs.CryptCoinMiner, "CryptCoin Miner", images.getImage(ImageNames_2.ImageNames.CryptCoinMiner), new Vector2_7.Vector2(400, 0), new Vector2_7.Vector2(480, 400), images) || this;
            _this.resources = resources;
            _this.input = input;
            _this.isMining = false;
            _this.miningStringStart = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
            _this.miningStringEnd = "00000000000000000000000000000000";
            _this.miningString = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
            _this.miningStringLength = 32;
            _this.miningStringChars = "0123456789ABCDEF";
            _this.miningTicks = 50;
            _this.currentMiningTicks = 0;
            _this.miningButton = new TextButton_1.TextButton("Start mining", new Rectangle_3.Rectangle(new Vector2_7.Vector2(16, 16), new Vector2_7.Vector2(192, 40)), function () {
                _this.isMining = !_this.isMining;
                _this.miningButton.text = _this.isMining ? "Stop mining" : "Start mining";
            });
            _this.algorithmButton = new TextButton_1.TextButton("Improve algorithm", new Rectangle_3.Rectangle(new Vector2_7.Vector2(16, 128), new Vector2_7.Vector2(240, 40)), function () {
                _this.resources.money -= _this.algorithmCost();
                _this.resources.cryptCoinMinerAlgorithmLevel++;
            }, function () { return _this.resources.money >= _this.algorithmCost(); });
            _this.hashButton = new TextButton_1.TextButton("Hash storage", new Rectangle_3.Rectangle(new Vector2_7.Vector2(16, 180), new Vector2_7.Vector2(240, 40)), function () {
                _this.resources.money -= _this.hashCost();
                _this.resources.cryptCoinMinerHashLevel++;
            }, function () { return _this.resources.money >= _this.hashCost(); });
            _this.cpuButton = new TextButton_1.TextButton("More CPU cores", new Rectangle_3.Rectangle(new Vector2_7.Vector2(16, 232), new Vector2_7.Vector2(240, 40)), function () {
                _this.resources.money -= _this.cpuCost();
                _this.resources.cryptCoinMinerCpuLevel++;
            }, function () { return _this.resources.money >= _this.cpuCost(); });
            _this.parallelButton = new TextButton_1.TextButton("Parallelization", new Rectangle_3.Rectangle(new Vector2_7.Vector2(16, 284), new Vector2_7.Vector2(240, 40)), function () {
                _this.resources.money -= _this.parallelCost();
                _this.resources.cryptCoinMinerParallelLevel++;
            }, function () { return _this.resources.money >= _this.parallelCost(); });
            _this.seedButton = new TextButton_1.TextButton("Seed prediction", new Rectangle_3.Rectangle(new Vector2_7.Vector2(16, 336), new Vector2_7.Vector2(240, 40)), function () {
                _this.resources.money -= _this.seedCost();
                _this.resources.cryptCoinMinerSeedLevel++;
            }, function () { return _this.resources.money >= _this.seedCost(); });
            _this.buttons = [
                _this.miningButton,
                _this.algorithmButton,
                _this.hashButton,
                _this.cpuButton,
                _this.parallelButton,
                _this.seedButton,
            ];
            return _this;
        }
        CryptCoinMinerPanel.prototype.updatePanel = function (panelRectangle) {
            var _this = this;
            this.buttons.forEach(function (x) { return x.update(_this.input, panelRectangle.topLeft()); });
            if (this.isMining) {
                this.resources.money += this.moneyPerTick();
                if (this.currentMiningTicks >= this.miningTicks) {
                    this.currentMiningTicks -= this.miningTicks;
                    if (this.miningString == this.miningStringEnd) {
                        this.miningString = this.miningStringStart;
                    }
                    else {
                        for (var i = 0; i < this.miningStringLength; i++) {
                            if (this.miningString[i] !== "0") {
                                this.miningString = this.miningString.substring(0, i);
                                for (; i < this.miningStringLength; i++) {
                                    this.miningString = this.miningString.concat(this.miningStringChars[MathHelper_4.MathHelper.randomInt(0, this.miningStringChars.length - 1)]);
                                }
                                break;
                            }
                        }
                    }
                }
                else {
                    this.currentMiningTicks +=
                        this.resources.cryptCoinMinerAlgorithmLevel +
                            this.resources.cryptCoinMinerHashLevel +
                            this.resources.cryptCoinMinerCpuLevel +
                            this.resources.cryptCoinMinerParallelLevel +
                            this.resources.cryptCoinMinerSeedLevel;
                }
            }
        };
        CryptCoinMinerPanel.prototype.drawPanel = function (context, panelRectangle) {
            this.buttons.forEach(function (x) { return x.draw(context, panelRectangle.topLeft()); });
            context.drawString(this.miningString, panelRectangle.topLeft().add(new Vector2_7.Vector2(16, 78)), 32, Fonts_3.Fonts.PixelOperator, this.isMining ? GameColour_3.GameColour.text : GameColour_3.GameColour.textDisabled, Align_4.Align.TopLeft);
            context.drawString("$" + Functions_1.numberWithPostfix(this.moneyPerTick() * GameBase_1.GameBase.updatesPerSecond) + "/s", panelRectangle.topLeft().add(new Vector2_7.Vector2(224, 24)), 32, Fonts_3.Fonts.PixelOperator, GameColour_3.GameColour.text, Align_4.Align.TopLeft);
            context.drawString("Cost: $" + Functions_1.numberWithPostfix(this.algorithmCost()), panelRectangle.topLeft().add(new Vector2_7.Vector2(272, 136)), 32, Fonts_3.Fonts.PixelOperator, GameColour_3.GameColour.text, Align_4.Align.TopLeft);
            context.drawString("Cost: $" + Functions_1.numberWithPostfix(this.hashCost()), panelRectangle.topLeft().add(new Vector2_7.Vector2(272, 188)), 32, Fonts_3.Fonts.PixelOperator, GameColour_3.GameColour.text, Align_4.Align.TopLeft);
            context.drawString("Cost: $" + Functions_1.numberWithPostfix(this.cpuCost()), panelRectangle.topLeft().add(new Vector2_7.Vector2(272, 240)), 32, Fonts_3.Fonts.PixelOperator, GameColour_3.GameColour.text, Align_4.Align.TopLeft);
            context.drawString("Cost: $" + Functions_1.numberWithPostfix(this.parallelCost()), panelRectangle.topLeft().add(new Vector2_7.Vector2(272, 292)), 32, Fonts_3.Fonts.PixelOperator, GameColour_3.GameColour.text, Align_4.Align.TopLeft);
            context.drawString("Cost: $" + Functions_1.numberWithPostfix(this.seedCost()), panelRectangle.topLeft().add(new Vector2_7.Vector2(272, 344)), 32, Fonts_3.Fonts.PixelOperator, GameColour_3.GameColour.text, Align_4.Align.TopLeft);
        };
        CryptCoinMinerPanel.prototype.algorithmCost = function () {
            return Math.pow(2, this.resources.cryptCoinMinerAlgorithmLevel - 1);
        };
        CryptCoinMinerPanel.prototype.hashCost = function () {
            return Math.pow(2.4, this.resources.cryptCoinMinerHashLevel);
        };
        CryptCoinMinerPanel.prototype.cpuCost = function () {
            return Math.pow(2.8, this.resources.cryptCoinMinerCpuLevel + 1);
        };
        CryptCoinMinerPanel.prototype.parallelCost = function () {
            return Math.pow(3.2, this.resources.cryptCoinMinerParallelLevel + 2);
        };
        CryptCoinMinerPanel.prototype.seedCost = function () {
            return Math.pow(3.6, this.resources.cryptCoinMinerSeedLevel + 3);
        };
        CryptCoinMinerPanel.prototype.moneyPerTick = function () {
            return 0.0005 *
                this.resources.cryptCoinMinerAlgorithmLevel *
                this.resources.cryptCoinMinerHashLevel *
                this.resources.cryptCoinMinerCpuLevel *
                this.resources.cryptCoinMinerParallelLevel *
                this.resources.cryptCoinMinerSeedLevel;
        };
        return CryptCoinMinerPanel;
    }(Panel_1.Panel));
    exports.CryptCoinMinerPanel = CryptCoinMinerPanel;
});
define("Game/Classes/HackinatorPanel", ["require", "exports", "Boilerplate/Classes/Rectangle", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Game/Enums/ImageNames", "Game/Enums/Programs", "Game/Modules/GameColour", "Game/Classes/Panel", "Game/Classes/TextButton", "Boilerplate/Classes/GameBase", "Game/Functions"], function (require, exports, Rectangle_4, Vector2_8, Align_5, Fonts_4, ImageNames_3, Programs_2, GameColour_4, Panel_2, TextButton_2, GameBase_2, Functions_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HackinatorPanel = void 0;
    var HackinatorPanel = /** @class */ (function (_super) {
        __extends(HackinatorPanel, _super);
        function HackinatorPanel(images, resources, input) {
            var _this = _super.call(this, Programs_2.Programs.Hackinator, "Hackinator", images.getImage(ImageNames_3.ImageNames.Hackinator), new Vector2_8.Vector2(400, 200), new Vector2_8.Vector2(480, 526), images) || this;
            _this.resources = resources;
            _this.input = input;
            _this.isHacking = false;
            _this.codeStrings = [">_", "", "", "", ""];
            _this.hackingTicks = 50;
            _this.currentHackingTicks = 0;
            _this.currentCodeStringPosition = -1;
            _this.displayLength = 30;
            _this.displayHeight = 5;
            _this.fullCodeString = null;
            _this.rectangles = [
                { rectangle: new Rectangle_4.Rectangle(new Vector2_8.Vector2(16, 78), new Vector2_8.Vector2(448, 160)), colour: GameColour_4.GameColour.greyscale100 },
                { rectangle: new Rectangle_4.Rectangle(new Vector2_8.Vector2(16, 78), new Vector2_8.Vector2(446, 158)), colour: GameColour_4.GameColour.greyscale50 },
                { rectangle: new Rectangle_4.Rectangle(new Vector2_8.Vector2(18, 80), new Vector2_8.Vector2(444, 156)), colour: GameColour_4.GameColour.greyscale100 },
                { rectangle: new Rectangle_4.Rectangle(new Vector2_8.Vector2(18, 80), new Vector2_8.Vector2(442, 154)), colour: GameColour_4.GameColour.greyscale0 }
            ];
            fetch("scripts/Main.js")
                .then(function (x) { return x.text(); })
                .then(function (x) { return _this.fullCodeString = _this.formatCodeString(x); });
            _this.hackingButton = new TextButton_2.TextButton("Start hacking", new Rectangle_4.Rectangle(new Vector2_8.Vector2(16, 16), new Vector2_8.Vector2(192, 40)), function () {
                _this.isHacking = !_this.isHacking;
                _this.hackingButton.text = _this.isHacking ? "Stop hacking" : "Start hacking";
            });
            _this.passwordCrackerButton = new TextButton_2.TextButton("Password cracker", new Rectangle_4.Rectangle(new Vector2_8.Vector2(16, 254), new Vector2_8.Vector2(240, 40)), function () {
                _this.resources.money -= _this.passwordCrackerCost();
                _this.resources.hackinatorPasswordCrackerLevel++;
            }, function () { return _this.resources.money >= _this.passwordCrackerCost(); });
            _this.sqlInjectionButton = new TextButton_2.TextButton("SQL Injection", new Rectangle_4.Rectangle(new Vector2_8.Vector2(16, 306), new Vector2_8.Vector2(240, 40)), function () {
                _this.resources.money -= _this.sqlInjectionCost();
                _this.resources.hackinatorSqlInjectionLevel++;
            }, function () { return _this.resources.money >= _this.sqlInjectionCost(); });
            _this.keyDecryptorButton = new TextButton_2.TextButton("Key Decryptor", new Rectangle_4.Rectangle(new Vector2_8.Vector2(16, 358), new Vector2_8.Vector2(240, 40)), function () {
                _this.resources.money -= _this.keyDecryptorCost();
                _this.resources.hackinatorKeyDecryptor++;
            }, function () { return _this.resources.money >= _this.keyDecryptorCost(); });
            _this.botnetButton = new TextButton_2.TextButton("Botnet", new Rectangle_4.Rectangle(new Vector2_8.Vector2(16, 410), new Vector2_8.Vector2(240, 40)), function () {
                _this.resources.money -= _this.botnetCost();
                _this.resources.hackinatorBotnetLevel++;
            }, function () { return _this.resources.money >= _this.botnetCost(); });
            _this.ransomwareButton = new TextButton_2.TextButton("Ransomware", new Rectangle_4.Rectangle(new Vector2_8.Vector2(16, 462), new Vector2_8.Vector2(240, 40)), function () {
                _this.resources.money -= _this.ransomwareCost();
                _this.resources.hackinatorRansomwareLevel++;
            }, function () { return _this.resources.money >= _this.ransomwareCost(); });
            _this.buttons = [
                _this.hackingButton,
                _this.passwordCrackerButton,
                _this.sqlInjectionButton,
                _this.keyDecryptorButton,
                _this.botnetButton,
                _this.ransomwareButton,
            ];
            return _this;
        }
        HackinatorPanel.prototype.updatePanel = function (panelRectangle) {
            var _this = this;
            this.buttons.forEach(function (x) { return x.update(_this.input, panelRectangle.topLeft()); });
            if (this.isHacking) {
                this.resources.money += this.moneyPerTick();
                while (this.currentHackingTicks >= this.hackingTicks) {
                    this.currentHackingTicks -= this.hackingTicks;
                    this.currentCodeStringPosition++;
                    this.setCodeStringDisplay();
                }
                this.currentHackingTicks +=
                    this.resources.hackinatorPasswordCrackerLevel +
                        this.resources.hackinatorSqlInjectionLevel +
                        this.resources.hackinatorKeyDecryptor +
                        this.resources.hackinatorBotnetLevel +
                        this.resources.hackinatorRansomwareLevel;
            }
        };
        HackinatorPanel.prototype.drawPanel = function (context, panelRectangle) {
            this.buttons.forEach(function (x) { return x.draw(context, panelRectangle.topLeft()); });
            context.drawString("$" + Functions_2.numberWithPostfix(this.moneyPerTick() * GameBase_2.GameBase.updatesPerSecond) + "/s", panelRectangle.topLeft().add(new Vector2_8.Vector2(224, 24)), 32, Fonts_4.Fonts.PixelOperator, GameColour_4.GameColour.text, Align_5.Align.TopLeft);
            context.drawString("Cost: $" + Functions_2.numberWithPostfix(this.passwordCrackerCost()), panelRectangle.topLeft().add(new Vector2_8.Vector2(272, 262)), 32, Fonts_4.Fonts.PixelOperator, GameColour_4.GameColour.text, Align_5.Align.TopLeft);
            context.drawString("Cost: $" + Functions_2.numberWithPostfix(this.sqlInjectionCost()), panelRectangle.topLeft().add(new Vector2_8.Vector2(272, 314)), 32, Fonts_4.Fonts.PixelOperator, GameColour_4.GameColour.text, Align_5.Align.TopLeft);
            context.drawString("Cost: $" + Functions_2.numberWithPostfix(this.keyDecryptorCost()), panelRectangle.topLeft().add(new Vector2_8.Vector2(272, 366)), 32, Fonts_4.Fonts.PixelOperator, GameColour_4.GameColour.text, Align_5.Align.TopLeft);
            context.drawString("Cost: $" + Functions_2.numberWithPostfix(this.botnetCost()), panelRectangle.topLeft().add(new Vector2_8.Vector2(272, 418)), 32, Fonts_4.Fonts.PixelOperator, GameColour_4.GameColour.text, Align_5.Align.TopLeft);
            context.drawString("Cost: $" + Functions_2.numberWithPostfix(this.ransomwareCost()), panelRectangle.topLeft().add(new Vector2_8.Vector2(272, 470)), 32, Fonts_4.Fonts.PixelOperator, GameColour_4.GameColour.text, Align_5.Align.TopLeft);
            this.rectangles.forEach(function (x) { return context.drawFillRectangle(new Rectangle_4.Rectangle(x.rectangle.position.add(panelRectangle.topLeft()), x.rectangle.size), x.colour); });
            this.drawCodeStringDisplay(context, panelRectangle.topLeft());
        };
        HackinatorPanel.prototype.passwordCrackerCost = function () {
            return Math.pow(2.2, this.resources.hackinatorPasswordCrackerLevel - 1) * 100000;
        };
        HackinatorPanel.prototype.sqlInjectionCost = function () {
            return Math.pow(3.3, this.resources.hackinatorSqlInjectionLevel) * 100000;
        };
        HackinatorPanel.prototype.keyDecryptorCost = function () {
            return Math.pow(4.4, this.resources.hackinatorKeyDecryptor + 1) * 100000;
        };
        HackinatorPanel.prototype.botnetCost = function () {
            return Math.pow(5.5, this.resources.hackinatorBotnetLevel + 2) * 100000;
        };
        HackinatorPanel.prototype.ransomwareCost = function () {
            return Math.pow(6.6, this.resources.hackinatorRansomwareLevel + 3) * 100000;
        };
        HackinatorPanel.prototype.moneyPerTick = function () {
            return 100 *
                this.resources.hackinatorPasswordCrackerLevel *
                this.resources.hackinatorSqlInjectionLevel *
                this.resources.hackinatorKeyDecryptor *
                this.resources.hackinatorBotnetLevel *
                this.resources.hackinatorRansomwareLevel;
        };
        HackinatorPanel.prototype.formatCodeString = function (codeString) {
            var formattedCodeString = codeString.replaceAll("\n", " ").replaceAll("\r", " ");
            var preReplaceLength;
            do {
                preReplaceLength = formattedCodeString.length;
                formattedCodeString = formattedCodeString.replaceAll("  ", " ");
            } while (preReplaceLength > formattedCodeString.length);
            return formattedCodeString;
        };
        HackinatorPanel.prototype.setCodeStringDisplay = function () {
            var currentLine = 0;
            for (var i = 0; i < this.displayHeight; i++) {
                if (this.codeStrings[i] != "")
                    currentLine = i;
            }
            this.codeStrings[currentLine] = ">" + this.fullCodeString.substring((this.currentCodeStringPosition - (this.currentCodeStringPosition % this.displayLength)) % this.fullCodeString.length, (this.currentCodeStringPosition + 1) % this.fullCodeString.length);
            if (this.codeStrings[currentLine].length === this.displayLength + 1) {
                if (currentLine === 4) {
                    for (var i = 0; i < this.displayHeight - 1; i++) {
                        this.codeStrings[i] = this.codeStrings[i + 1];
                    }
                    this.codeStrings[4] = ">_";
                }
                else {
                    this.codeStrings[currentLine + 1] = ">_";
                }
            }
            else {
                this.codeStrings[currentLine] += "_";
            }
        };
        HackinatorPanel.prototype.drawCodeStringDisplay = function (context, offset) {
            for (var i = 0; i < this.displayHeight; i++)
                for (var j = 0; j < this.codeStrings[i].length; j++)
                    context.drawString(this.codeStrings[i][j], offset.add(new Vector2_8.Vector2(27 + (j * 14), 90 + (i * 32))), 32, Fonts_4.Fonts.PixelOperator, GameColour_4.GameColour.textConsole, Align_5.Align.Center);
        };
        return HackinatorPanel;
    }(Panel_2.Panel));
    exports.HackinatorPanel = HackinatorPanel;
});
define("Game/Classes/Picture", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Picture = void 0;
    var Picture = /** @class */ (function () {
        function Picture(image, rectangle) {
            this.image = image;
            this.rectangle = rectangle;
        }
        Picture.prototype.draw = function (context, offset) {
            context.drawImageRectangle(this.image, this.rectangle.offset(offset));
        };
        return Picture;
    }());
    exports.Picture = Picture;
});
define("Game/Classes/Text", ["require", "exports", "Boilerplate/Enums/Fonts", "Game/Modules/GameColour"], function (require, exports, Fonts_5, GameColour_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Text = void 0;
    var Text = /** @class */ (function () {
        function Text(text, position, align) {
            this.text = text;
            this.position = position;
            this.align = align;
        }
        Text.prototype.draw = function (context, offset) {
            context.drawString(typeof this.text === "string" ? this.text : this.text(), this.position.add(offset), 32, Fonts_5.Fonts.PixelOperator, GameColour_5.GameColour.text, this.align);
        };
        return Text;
    }());
    exports.Text = Text;
});
define("Game/Classes/ProgramShopPanel", ["require", "exports", "Boilerplate/Classes/Rectangle", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Align", "Game/Enums/ImageNames", "Game/Enums/Programs", "Game/Functions", "Game/Classes/Panel", "Game/Classes/Picture", "Game/Classes/Text", "Game/Classes/TextButton"], function (require, exports, Rectangle_5, Vector2_9, Align_6, ImageNames_4, Programs_3, Functions_3, Panel_3, Picture_1, Text_1, TextButton_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgramShopPanel = void 0;
    var ProgramShopPanel = /** @class */ (function (_super) {
        __extends(ProgramShopPanel, _super);
        function ProgramShopPanel(images, resources, input) {
            var _this = _super.call(this, Programs_3.Programs.ProgramShop, "Program Shop", images.getImage(ImageNames_4.ImageNames.ProgramShop), new Vector2_9.Vector2(900, 0), new Vector2_9.Vector2(664, 400), images) || this;
            _this.resources = resources;
            _this.input = input;
            _this.cryptCoinMinerCost = 10;
            _this.hackinatorCost = 100000;
            _this.purchaseCryptCoinMinerButton = new TextButton_3.TextButton("Purchase", new Rectangle_5.Rectangle(new Vector2_9.Vector2(480, 16), new Vector2_9.Vector2(160, 40)), function () {
                _this.resources.money -= _this.cryptCoinMinerCost;
                _this.resources.programCryptCoinMinerUnlocked = true;
            }, function () { return !_this.resources.programCryptCoinMinerUnlocked && _this.resources.money >= _this.cryptCoinMinerCost; }, function () { return _this.purchaseCryptCoinMinerButton.text = _this.resources.programCryptCoinMinerUnlocked ? "Purchased" : "Purchase"; }, function () { return _this.purchaseCryptCoinMinerButton.text = _this.resources.programCryptCoinMinerUnlocked ? "Purchased" : "Purchase"; });
            _this.purchaseHackinatorButton = new TextButton_3.TextButton("Purchase", new Rectangle_5.Rectangle(new Vector2_9.Vector2(480, 68), new Vector2_9.Vector2(160, 40)), function () {
                _this.resources.money -= _this.hackinatorCost;
                _this.resources.programHackinatorUnlocked = true;
            }, function () { return !_this.resources.programHackinatorUnlocked && _this.resources.money >= _this.hackinatorCost; }, function () { return _this.purchaseHackinatorButton.text = _this.resources.programHackinatorUnlocked ? "Purchased" : "Purchase"; }, function () { return _this.purchaseHackinatorButton.text = _this.resources.programHackinatorUnlocked ? "Purchased" : "Purchase"; });
            _this.buttons = [
                _this.purchaseCryptCoinMinerButton,
                _this.purchaseHackinatorButton,
            ];
            _this.pictures = [
                new Picture_1.Picture(images.getImage(ImageNames_4.ImageNames.CryptCoinMiner), new Rectangle_5.Rectangle(new Vector2_9.Vector2(16, 24), new Vector2_9.Vector2(32, 32))),
                new Picture_1.Picture(images.getImage(ImageNames_4.ImageNames.Hackinator), new Rectangle_5.Rectangle(new Vector2_9.Vector2(16, 76), new Vector2_9.Vector2(32, 32))),
            ];
            _this.text = [
                new Text_1.Text("CryptCoin Miner", new Vector2_9.Vector2(56, 24), Align_6.Align.TopLeft),
                new Text_1.Text("Cost: $" + Functions_3.numberWithPostfix(_this.cryptCoinMinerCost), new Vector2_9.Vector2(280, 24), Align_6.Align.TopLeft),
                new Text_1.Text("Hackinator", new Vector2_9.Vector2(56, 76), Align_6.Align.TopLeft),
                new Text_1.Text("Cost: $" + Functions_3.numberWithPostfix(_this.hackinatorCost), new Vector2_9.Vector2(280, 76), Align_6.Align.TopLeft),
            ];
            return _this;
        }
        ProgramShopPanel.prototype.updatePanel = function (panelRectangle) {
            var _this = this;
            this.buttons.forEach(function (x) { return x.update(_this.input, panelRectangle.topLeft()); });
        };
        ProgramShopPanel.prototype.drawPanel = function (context, panelRectangle) {
            this.buttons.forEach(function (x) { return x.draw(context, panelRectangle.topLeft()); });
            this.pictures.forEach(function (x) { return x.draw(context, panelRectangle.topLeft()); });
            this.text.forEach(function (x) { return x.draw(context, panelRectangle.topLeft()); });
        };
        return ProgramShopPanel;
    }(Panel_3.Panel));
    exports.ProgramShopPanel = ProgramShopPanel;
});
define("Game/Classes/WalletPanel", ["require", "exports", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Game/Enums/ImageNames", "Game/Enums/Programs", "Game/Functions", "Game/Modules/GameColour", "Game/Classes/Panel"], function (require, exports, Vector2_10, Align_7, Fonts_6, ImageNames_5, Programs_4, Functions_4, GameColour_6, Panel_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WalletPanel = void 0;
    var WalletPanel = /** @class */ (function (_super) {
        __extends(WalletPanel, _super);
        function WalletPanel(images, resources) {
            var _this = _super.call(this, Programs_4.Programs.Wallet, "Wallet", images.getImage(ImageNames_5.ImageNames.Wallet), Vector2_10.Vector2.zero(), new Vector2_10.Vector2(200, 34), images) || this;
            _this.resources = resources;
            return _this;
        }
        WalletPanel.prototype.updatePanel = function () { };
        WalletPanel.prototype.drawPanel = function (context, panelRectangle) {
            context.drawString("$" + Functions_4.numberWithPostfix(this.resources.money), panelRectangle.topLeft(), 32, Fonts_6.Fonts.PixelOperator, GameColour_6.GameColour.text, Align_7.Align.TopLeft);
        };
        return WalletPanel;
    }(Panel_4.Panel));
    exports.WalletPanel = WalletPanel;
});
define("Game/Classes/ProgramManager", ["require", "exports", "Game/Enums/Programs", "Game/Classes/CryptCoinMinerPanel", "Game/Classes/HackinatorPanel", "Game/Classes/ProgramShopPanel", "Game/Classes/WalletPanel"], function (require, exports, Programs_5, CryptCoinMinerPanel_1, HackinatorPanel_1, ProgramShopPanel_1, WalletPanel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgramManager = void 0;
    var ProgramManager = /** @class */ (function () {
        function ProgramManager() {
            this.panels = [];
            this.panelCreators = new Map();
        }
        ProgramManager.prototype.initialize = function (images, resources, input) {
            this.panelCreators.set(Programs_5.Programs.Wallet, function () { return new WalletPanel_1.WalletPanel(images, resources); });
            this.panelCreators.set(Programs_5.Programs.ProgramShop, function () { return new ProgramShopPanel_1.ProgramShopPanel(images, resources, input); });
            this.panelCreators.set(Programs_5.Programs.CryptCoinMiner, function () { return new CryptCoinMinerPanel_1.CryptCoinMinerPanel(images, resources, input); });
            this.panelCreators.set(Programs_5.Programs.Hackinator, function () { return new HackinatorPanel_1.HackinatorPanel(images, resources, input); });
        };
        ProgramManager.prototype.runProgram = function (program) {
            if (this.panels.every(function (x) { return x.program !== program; })) {
                var newPanel = this.panelCreators.get(program)();
                newPanel.setFocus(true);
                this.panels = __spreadArray([newPanel], this.panels);
            }
        };
        ProgramManager.prototype.update = function (input) {
            this.panels.forEach(function (panel) {
                panel.update(input);
            });
            var toClose = this.panels.filter(function (x) { return x.getToClose(); });
            this.panels = this.panels.filter(function (x) { return toClose.every(function (y) { return y !== x; }); });
            var toFocus = this.panels.filter(function (x) { return x.getToFocus(); })[0];
            var currentlyFocused = this.panels.filter(function (x) { return x.getHasFocus(); })[0];
            var toUnfocus = this.panels.filter(function (x) { return x !== toFocus && x !== currentlyFocused; });
            toUnfocus.forEach(function (x) { return x.setFocus(false); });
            if (currentlyFocused != null && toFocus == null) {
                currentlyFocused.setFocus(true);
            }
            else if (currentlyFocused != null && toFocus != null && currentlyFocused != toFocus) {
                toFocus.setFocus(true);
                currentlyFocused.setFocus(false);
                this.panels = __spreadArray([toFocus, currentlyFocused], toUnfocus);
            }
            else if (currentlyFocused == null && toFocus != null) {
                toFocus.setFocus(true);
                this.panels = __spreadArray([toFocus], toUnfocus);
            }
        };
        ProgramManager.prototype.draw = function (context) {
            this.panels.reverse().forEach(function (panel) {
                panel.draw(context);
            });
            this.panels.reverse();
        };
        return ProgramManager;
    }());
    exports.ProgramManager = ProgramManager;
});
define("Game/Classes/StartMenuEntry", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StartMenuEntry = void 0;
    var StartMenuEntry = /** @class */ (function () {
        function StartMenuEntry(id, name, image, installed, program) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.installed = installed;
            this.program = program;
        }
        return StartMenuEntry;
    }());
    exports.StartMenuEntry = StartMenuEntry;
});
define("Game/Classes/StartMenu", ["require", "exports", "Boilerplate/Classes/Rectangle", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Boilerplate/Enums/MouseButton", "Game/Enums/ImageNames", "Game/Enums/Programs", "Game/Modules/GameColour", "Game/Classes/StartMenuEntry"], function (require, exports, Rectangle_6, Vector2_11, Align_8, Fonts_7, MouseButton_3, ImageNames_6, Programs_6, GameColour_7, StartMenuEntry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StartMenu = void 0;
    var StartMenu = /** @class */ (function () {
        function StartMenu() {
            this.startMenuOpen = false;
            this.startButtonRect1 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(4, 0), new Vector2_11.Vector2(114, 44));
            this.startButtonRect2 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(4, 0), new Vector2_11.Vector2(112, 42));
            this.startButtonRect3 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(6, 0), new Vector2_11.Vector2(110, 40));
            this.startButtonRect4 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(6, 0), new Vector2_11.Vector2(108, 38));
            this.startButtonRect5 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(8, 0), new Vector2_11.Vector2(106, 36));
            this.startButtonOffset1 = 48;
            this.startButtonOffset2 = 48;
            this.startButtonOffset3 = 46;
            this.startButtonOffset4 = 46;
            this.startButtonOffset5 = 44;
            this.startTextOffset = new Vector2_11.Vector2(4, 0);
            this.startImageRect = new Rectangle_6.Rectangle(new Vector2_11.Vector2(0, 0), new Vector2_11.Vector2(32, 32));
            this.startMenuRectangle1 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(4, 0), new Vector2_11.Vector2(328, 480));
            this.startMenuRectangle2 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(4, 0), new Vector2_11.Vector2(326, 478));
            this.startMenuRectangle3 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(6, 0), new Vector2_11.Vector2(324, 476));
            this.startMenuRectangle4 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(6, 0), new Vector2_11.Vector2(322, 474));
            this.startMenuRectangle5 = new Rectangle_6.Rectangle(new Vector2_11.Vector2(8, 0), new Vector2_11.Vector2(320, 472));
            this.startMenuOffset1 = 528;
            this.startMenuOffset2 = 528;
            this.startMenuOffset3 = 526;
            this.startMenuOffset4 = 526;
            this.startMenuOffset5 = 524;
            this.startMenuEntries = [];
            this.selectedEntries = [];
        }
        StartMenu.prototype.initialize = function (images, resources) {
            this.startImage = images.getImage(ImageNames_6.ImageNames.Start);
            this.setupStartMenu(images, resources);
        };
        StartMenu.prototype.update = function (context, input, runner) {
            var canvasSize = context.getCanvasSize();
            this.startButtonRect1.position.y = canvasSize.y - this.startButtonOffset1;
            this.startButtonRect2.position.y = canvasSize.y - this.startButtonOffset2;
            this.startButtonRect3.position.y = canvasSize.y - this.startButtonOffset3;
            this.startButtonRect4.position.y = canvasSize.y - this.startButtonOffset4;
            this.startButtonRect5.position.y = canvasSize.y - this.startButtonOffset5;
            this.startMenuRectangle1.position.y = canvasSize.y - this.startMenuOffset1;
            this.startMenuRectangle2.position.y = canvasSize.y - this.startMenuOffset2;
            this.startMenuRectangle3.position.y = canvasSize.y - this.startMenuOffset3;
            this.startMenuRectangle4.position.y = canvasSize.y - this.startMenuOffset4;
            this.startMenuRectangle5.position.y = canvasSize.y - this.startMenuOffset5;
            this.startImageRect.position = this.startButtonRect5.position.addNumber(2);
            var newSelectedEntries = [];
            var installed = this.getInstalledPrograms();
            if (this.startMenuOpen) {
                for (var i = 0; i < installed.length; i++) {
                    var entryRectangle = new Rectangle_6.Rectangle(new Vector2_11.Vector2(this.startMenuRectangle5.position.x + 42, this.startMenuRectangle5.position.y + 64 * i), new Vector2_11.Vector2(276, 64));
                    if (entryRectangle.intersectsPoint(input.getMousePosition())) {
                        newSelectedEntries.push(installed[i].id);
                    }
                }
            }
            this.selectedEntries = newSelectedEntries;
            if (input.hasUnusedClick(MouseButton_3.MouseButton.Left)) {
                if (this.startButtonRect1.intersectsPoint(input.getMousePosition())) {
                    this.startMenuOpen = !this.startMenuOpen;
                    input.setClickUsed(MouseButton_3.MouseButton.Left);
                }
                else {
                    for (var i = 0; i < installed.length; i++) {
                        var entryRectangle = new Rectangle_6.Rectangle(new Vector2_11.Vector2(this.startMenuRectangle5.position.x + 42, this.startMenuRectangle5.position.y + 64 * i), new Vector2_11.Vector2(276, 64));
                        if (entryRectangle.intersectsPoint(input.getMousePosition())) {
                            var entry = installed[i];
                            if (entry.program != null) {
                                runner.runProgram(entry.program);
                                this.startMenuOpen = false;
                                input.setClickUsed(MouseButton_3.MouseButton.Left);
                            }
                        }
                    }
                }
                if (this.startMenuRectangle1.intersectsPoint(input.getMousePosition()))
                    input.setClickUsed(MouseButton_3.MouseButton.Left);
            }
        };
        StartMenu.prototype.draw = function (context) {
            context.drawFillRectangle(this.startButtonRect1, GameColour_7.GameColour.greyscale0);
            context.drawFillRectangle(this.startButtonRect2, GameColour_7.GameColour.greyscale100);
            context.drawFillRectangle(this.startButtonRect3, GameColour_7.GameColour.greyscale50);
            context.drawFillRectangle(this.startButtonRect4, GameColour_7.GameColour.greyscale87);
            context.drawFillRectangle(this.startButtonRect5, GameColour_7.GameColour.greyscale75);
            context.drawString("Start", this.startButtonRect5.rightCenter().subtract(this.startTextOffset), 32, Fonts_7.Fonts.PixelOperator, GameColour_7.GameColour.text, Align_8.Align.Right);
            context.drawImageRectangle(this.startImage, this.startImageRect);
            if (this.startMenuOpen) {
                context.drawFillRectangle(this.startMenuRectangle1, GameColour_7.GameColour.greyscale0);
                context.drawFillRectangle(this.startMenuRectangle2, GameColour_7.GameColour.greyscale87);
                context.drawFillRectangle(this.startMenuRectangle3, GameColour_7.GameColour.greyscale50);
                context.drawFillRectangle(this.startMenuRectangle4, GameColour_7.GameColour.greyscale100);
                context.drawFillRectangle(this.startMenuRectangle5, GameColour_7.GameColour.greyscale75);
                var installed_1 = this.getInstalledPrograms();
                var _loop_1 = function (i) {
                    var textColour = GameColour_7.GameColour.text;
                    if (this_1.selectedEntries.some(function (x) { return x === installed_1[i].id; })) {
                        context.drawFillRectangle(new Rectangle_6.Rectangle(new Vector2_11.Vector2(this_1.startMenuRectangle5.position.x + 42, this_1.startMenuRectangle5.position.y + 64 * i), new Vector2_11.Vector2(276, 64)), GameColour_7.GameColour.selected);
                        textColour = GameColour_7.GameColour.selectedText;
                    }
                    context.drawImageRectangle(installed_1[i].image, new Rectangle_6.Rectangle(new Vector2_11.Vector2(this_1.startMenuRectangle5.position.x + 62, this_1.startMenuRectangle5.position.y + 8 + 64 * i), new Vector2_11.Vector2(48, 48)));
                    context.drawString(installed_1[i].name, new Vector2_11.Vector2(this_1.startMenuRectangle5.position.x + 130, this_1.startMenuRectangle5.position.y + 32 + 64 * i), 32, Fonts_7.Fonts.PixelOperator, textColour, Align_8.Align.Left);
                };
                var this_1 = this;
                for (var i = 0; i < installed_1.length; i++) {
                    _loop_1(i);
                }
            }
        };
        StartMenu.prototype.setupStartMenu = function (images, resources) {
            this.startMenuEntries = [];
            this.startMenuEntries.push(new StartMenuEntry_1.StartMenuEntry(1, "Wallet", images.getImage(ImageNames_6.ImageNames.Wallet), function () { return true; }, Programs_6.Programs.Wallet));
            this.startMenuEntries.push(new StartMenuEntry_1.StartMenuEntry(2, "Program Shop", images.getImage(ImageNames_6.ImageNames.ProgramShop), function () { return true; }, Programs_6.Programs.ProgramShop));
            this.startMenuEntries.push(new StartMenuEntry_1.StartMenuEntry(3, "CryptCoin Miner", images.getImage(ImageNames_6.ImageNames.CryptCoinMiner), function () { return resources.programCryptCoinMinerUnlocked; }, Programs_6.Programs.CryptCoinMiner));
            this.startMenuEntries.push(new StartMenuEntry_1.StartMenuEntry(4, "Hackinator", images.getImage(ImageNames_6.ImageNames.Hackinator), function () { return resources.programHackinatorUnlocked; }, Programs_6.Programs.Hackinator));
        };
        StartMenu.prototype.getInstalledPrograms = function () {
            return this.startMenuEntries.filter(function (x) { return x.installed(); });
        };
        return StartMenu;
    }());
    exports.StartMenu = StartMenu;
});
define("Game/Classes/Taskbar", ["require", "exports", "Boilerplate/Classes/Rectangle", "Boilerplate/Classes/Vector2", "Boilerplate/Enums/Align", "Boilerplate/Enums/Fonts", "Game/Modules/GameColour"], function (require, exports, Rectangle_7, Vector2_12, Align_9, Fonts_8, GameColour_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Taskbar = void 0;
    var Taskbar = /** @class */ (function () {
        function Taskbar() {
            this.taskbarRect1 = new Rectangle_7.Rectangle(Vector2_12.Vector2.zero(), new Vector2_12.Vector2(0, 52));
            this.taskbarRect2 = new Rectangle_7.Rectangle(Vector2_12.Vector2.zero(), new Vector2_12.Vector2(0, 2));
            this.taskbarRect3 = new Rectangle_7.Rectangle(Vector2_12.Vector2.zero(), new Vector2_12.Vector2(0, 2));
            this.taskbarOffset1 = 52;
            this.taskbarOffset2 = 54;
            this.taskbarOffset3 = 56;
            this.timeRect1 = new Rectangle_7.Rectangle(Vector2_12.Vector2.zero(), new Vector2_12.Vector2(128, 44));
            this.timeRect2 = new Rectangle_7.Rectangle(Vector2_12.Vector2.zero(), new Vector2_12.Vector2(126, 42));
            this.timeRect3 = new Rectangle_7.Rectangle(Vector2_12.Vector2.zero(), new Vector2_12.Vector2(124, 40));
            this.timeOffset1 = new Vector2_12.Vector2(132, 48);
            this.timeOffset2 = new Vector2_12.Vector2(132, 48);
            this.timeOffset3 = new Vector2_12.Vector2(130, 46);
            this.timeString = "";
        }
        Taskbar.prototype.update = function (context) {
            var canvasSize = context.getCanvasSize();
            this.taskbarRect1.position.y = canvasSize.y - this.taskbarOffset1;
            this.taskbarRect2.position.y = canvasSize.y - this.taskbarOffset2;
            this.taskbarRect3.position.y = canvasSize.y - this.taskbarOffset3;
            this.taskbarRect1.size.x = canvasSize.x;
            this.taskbarRect2.size.x = canvasSize.x;
            this.taskbarRect3.size.x = canvasSize.x;
            this.timeRect1.position = canvasSize.subtract(this.timeOffset1);
            this.timeRect2.position = canvasSize.subtract(this.timeOffset2);
            this.timeRect3.position = canvasSize.subtract(this.timeOffset3);
            var now = new Date(Date.now());
            var minutes = now.getMinutes().toString();
            if (minutes.length === 1)
                minutes = "0" + minutes;
            var hour = now.getHours();
            var meridiem = "AM";
            if (hour === 0)
                hour = 12;
            else if (hour > 12) {
                hour -= 12;
                meridiem = "PM";
            }
            this.timeString = hour + ":" + minutes + " " + meridiem;
        };
        Taskbar.prototype.draw = function (context) {
            context.drawFillRectangle(this.taskbarRect1, GameColour_8.GameColour.greyscale75);
            context.drawFillRectangle(this.taskbarRect2, GameColour_8.GameColour.greyscale87);
            context.drawFillRectangle(this.taskbarRect3, GameColour_8.GameColour.greyscale100);
            context.drawFillRectangle(this.timeRect1, GameColour_8.GameColour.greyscale100);
            context.drawFillRectangle(this.timeRect2, GameColour_8.GameColour.greyscale50);
            context.drawFillRectangle(this.timeRect3, GameColour_8.GameColour.greyscale75);
            context.drawString(this.timeString, this.timeRect3.center(), 32, Fonts_8.Fonts.PixelOperator, GameColour_8.GameColour.text, Align_9.Align.Center);
        };
        return Taskbar;
    }());
    exports.Taskbar = Taskbar;
});
define("Game/Classes/Game", ["require", "exports", "Boilerplate/Classes/GameBase", "Game/Enums/ImageNames", "Game/Classes/ProgramManager", "Game/Classes/Resources", "Game/Classes/StartMenu", "Game/Classes/Taskbar"], function (require, exports, GameBase_3, ImageNames_7, ProgramManager_1, Resources_1, StartMenu_1, Taskbar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super.call(this, ImageNames_7.ImageNames) || this;
        }
        Game.prototype.initialize = function () {
            this.resources = new Resources_1.Resources();
            this.taskbar = new Taskbar_1.Taskbar();
            this.startMenu = new StartMenu_1.StartMenu();
            this.startMenu.initialize(this.images, this.resources);
            this.programManager = new ProgramManager_1.ProgramManager();
            this.programManager.initialize(this.images, this.resources, this.input);
        };
        Game.prototype.update = function () {
            this.programManager.update(this.input);
            this.taskbar.update(this.context);
            this.startMenu.update(this.context, this.input, this.programManager);
        };
        Game.prototype.draw = function () {
            this.programManager.draw(this.context);
            this.taskbar.draw(this.context);
            this.startMenu.draw(this.context);
        };
        return Game;
    }(GameBase_3.GameBase));
    exports.Game = Game;
});
define("Main", ["require", "exports", "Game/Classes/Game", "Boilerplate/Classes/Context2D"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new Game_1.Game().run();
});
define("Boilerplate/Modules/Utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Utils = void 0;
    var Utils;
    (function (Utils) {
        function createMultidimensionalArray(width, height, defaultValue) {
            var multiArray = [];
            for (var x = 0; x < width; x++) {
                var array = [];
                for (var y = 0; y < height; y++) {
                    array.push(defaultValue);
                }
                multiArray.push(array);
            }
            return multiArray;
        }
        Utils.createMultidimensionalArray = createMultidimensionalArray;
    })(Utils = exports.Utils || (exports.Utils = {}));
});
//# sourceMappingURL=Main.js.map