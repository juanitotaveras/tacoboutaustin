
<!-- .slide: data-background-image="./assets/md/assets/austin_skyline.jpg" data-background-size="100% 100%" data-background-color=" " data-background-position="center" -->


# Tacoboutaustin

### Where to eat, where to stay, and what to do in Austin, Texas.

---
<!-- .slide: data-background-image="./assets/md/assets/austin_skyline.jpg" data-background-size="100% 100%" data-background-color=" " data-background-position="center" -->


## Tips!

<br>

<i class="fa fa-arrows gp-tip" aria-hidden="true"> Press F to go Fullscreen</i>

<i class="fa fa-microphone gp-tip" aria-hidden="true"> Press S for Speaker Notes</i>

---
<!-- .slide: data-background-image="./assets/md/assets/kyle-gregory-devaras.jpg" data-background-size="100% 100%" data-background-color=" " data-background-position="center" -->


## Template Features

- Code Presenting  <!-- .element: class="fragment" -->
- Repo Source, Static Blocks, GIST  <!-- .element: class="fragment" -->
- Custom CSS Styling  <!-- .element: class="fragment" -->
- Slideshow Background Image  <!-- .element: class="fragment" -->
- Slide-specific Background Images  <!-- .element: class="fragment" -->
- Custom Logo, TOC, and Footnotes  <!-- .element: class="fragment" -->

---
### Code Block Delimiter
sample/go/server.go
### Source File Not Found


<span class="code-presenting-annotation fragment current-only" data-code-focus="1,3-6">Present code found within any repo source file.</span>
<span class="code-presenting-annotation fragment current-only" data-code-focus="8-18">Without ever leaving your slideshow.</span>
<span class="code-presenting-annotation fragment current-only" data-code-focus="19-28">Using GitPitch code-presenting with (optional) annotations.</span>

---
<!-- .slide: data-background-image="./assets/md/assets/john-reign-abarintos.jpg" data-background-size="100% 100%" data-background-color=" " data-background-position="center" -->


<span class="menu-title" style="display: none">JavaScript Block</span>

<p><span class="slide-title">JavaScript Block</span></p>

```javascript
// Include http module.
var http = require("http");

// Create the server. Function passed as parameter
// is called on every request made.
http.createServer(function (request, response) {
  // Attach listener on end event.  This event is
  // called when client sent, awaiting response.
  request.on("end", function () {
    // Write headers to the response.
    // HTTP 200 status, Content-Type text/plain.
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    // Send data and end response.
    response.end('Hello HTTP!');
  });

// Listen on the 8080 port.
}).listen(8080);
```

<span class="code-presenting-annotation fragment current-only" data-code-focus="1,2">You can present code inlined within your slide markdown too.</span>
<span class="code-presenting-annotation fragment current-only" data-code-focus="9-17">Displayed using code-syntax highlighting just like your IDE.</span>
<span class="code-presenting-annotation fragment current-only" data-code-focus="19-20">Again, all of this without ever leaving your slideshow.</span>

---

<span class='menu-title slide-title'>Scala GIST</span>
```scala
package io.onetapbeyond.lambda.spark.executor.examples

import io.onetapbeyond.lambda.spark.executor.Gateway._
import io.onetapbeyond.aws.gateway.executor._
import org.apache.spark._
import scala.collection.JavaConverters._

/*
 * TaskDelegation
 *
 * https://github.com/onetapbeyond/lambda-spark-executor
 *
 * A sample application that demonstrates the basic usage
 * of SAMBA to delegate selected Spark RDD tasks to execute
 * on AWS Lambda compute infrastructure in the cloud.
 */
object TaskDelegation {

  def main(args:Array[String]):Unit = {

    try {

      val sc = initSparkContext()

      /*
       * Initialize a basic batch data source for the
       * example by generating an RDD[Int].
       */
      val dataRDD = sc.parallelize(1 to BATCH_DATA_SIZE)

      /*
       * API_GATEWAY represents the API on the AWS API
       * Gateway implemented by an AWS Lambda function.
       * We register the gateway as a Spark broadcast
       * variable so it can be safely referenced later
       * within the Spark RDD.map operation that builds
       * our AWSTask.
       */
      val gateway = sc.broadcast(API_GATEWAY)

      /*
       * Map over dataRDD[Int] to produce an RDD[AWSTask].
       * Each AWSTask will execute an AWS Lambda function
       * exposed by the API_SCORE_ENDPOINT endpoint on the
       * AWS API Gateway.
       */
      val aTaskRDD = dataRDD.map(num => {

        AWS.Task(gateway.value)
           .resource(API_SCORE_ENDPOINT)
           .input(Map("num" -> num).asJava)
           .post()
      })

      aTaskRDD.foreach { aTask => println(aTask) }

      /*
       * Delegate aTaskRDD[AWSTask] execution to AWS Lambda
       * compute infrastructure to produce
       * aTaskResultRDD[AWSResult].
       */
      val aTaskResultRDD = aTaskRDD.delegate

      /*
       * As this is an example application we can simply use
       * the foreach() operation on the RDD to force the
       * computation and to output the results. And as we are
       * using a mock API on the AWS API Gateway there is no
       * response data, the result simply indicates success
       * or failure.
       */
      aTaskResultRDD.foreach { result => {
        println("TaskDelegation: compute score input=" +
          result.input + " result=" + result.success)
      }}

    } catch {
      case t:Throwable =>
        println("TaskDelegation: caught ex=" + t)
    }

  }

  def initSparkContext():SparkContext = {
    val conf = new SparkConf().setAppName(APP_NAME)
    new SparkContext(conf)
  }

  private val APP_NAME = "SAMBA Task Delegation Example"
  private val BATCH_DATA_SIZE = 10
  private val API_ID = "06ti6xmgg2"
  private val API_STAGE = "mock"
  private val API_SCORE_ENDPOINT = "/score"
  private val API_GATEWAY:AWSGateway =
    AWS.Gateway(API_ID).region(AWS.Region.OREGON)
                       .stage(API_STAGE)
                       .build()
}
```


<span class="code-presenting-annotation fragment current-only" data-code-focus="23">You can even present code found within any GitHub GIST.</span>
<span class="code-presenting-annotation fragment current-only" data-code-focus="41-53">GIST source code is beautifully rendered on any slide.</span>
<span class="code-presenting-annotation fragment current-only" data-code-focus="57-62">And code-presenting works seamlessly for GIST too, both online and offline.</span>

---
<!-- .slide: data-background-image="./assets/md/assets/kyle-gregory-devaras.jpg" data-background-size="100% 100%" data-background-color=" " data-background-position="center" -->


## Template Help

- [Code Presenting](https://github.com/gitpitch/gitpitch/wiki/Code-Presenting)
  + [Repo Source](https://github.com/gitpitch/gitpitch/wiki/Code-Delimiter-Slides), [Static Blocks](https://github.com/gitpitch/gitpitch/wiki/Code-Slides), [GIST](https://github.com/gitpitch/gitpitch/wiki/GIST-Slides) 
- [Custom CSS Styling](https://github.com/gitpitch/gitpitch/wiki/Slideshow-Custom-CSS)
- [Slideshow Background Image](https://github.com/gitpitch/gitpitch/wiki/Background-Setting)
- [Slide-specific Background Images](https://github.com/gitpitch/gitpitch/wiki/Image-Slides#background)
- [Custom Logo](https://github.com/gitpitch/gitpitch/wiki/Logo-Setting), [TOC](https://github.com/gitpitch/gitpitch/wiki/Table-of-Contents), and [Footnotes](https://github.com/gitpitch/gitpitch/wiki/Footnote-Setting)

---
<!-- .slide: data-background-image="./assets/md/assets/kyle-gregory-devaras.jpg" data-background-size="100% 100%" data-background-color=" " data-background-position="center" -->


## Go GitPitch Pro!

<br>
<div class="left">
    <i class="fa fa-user-secret fa-5x" aria-hidden="true"> </i><br>
    <a href="https://gitpitch.com/pro-features" class="pro-link">
    More details here.</a>
</div>
<div class="right">
    <ul>
        <li>Private Repos</li>
        <li>Private URLs</li>
        <li>Password-Protection</li>
        <li>Image Opacity</li>
        <li>SVG Image Support</li>
    </ul>
</div>

---
<!-- .slide: data-background-image="./assets/md/assets/kyle-gregory-devaras.jpg" data-background-size="100% 100%" data-background-color=" " data-background-position="center" -->


### Questions?

<br>

<i class="fa fa-twitter gp-contact" aria-hidden="true"> @gitpitch</i>

<i class="fa fa-github gp-contact" aria-hidden="true"> gitpitch</i>

<i class="fa fa-medium gp-contact" aria-hidden="true"> @gitpitch</i>

---
<!-- .slide: data-background-image="./assets/md/assets/gitpitch-audience.jpg" data-background-size="100% 100%" data-background-color=" " data-background-position="center" -->


<span class="menu-title" style="display: none">Download this Template!</span>

### Get your presentation started!
### [Download this template <i class="fa fa-external-link gp-download" aria-hidden="true"> </i>](https://gitpitch.com/template/download/space)