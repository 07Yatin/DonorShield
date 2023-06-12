import React from 'react'
import "./contact.css"

export default function contact() {
  return (
      <section class="contact">
        <div class="content">
            <h2>Contact Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero aliquid 
                ullam eligendi facere! Dolor error tempora hic voluptas, repellendus laudantium labore odio sunt obcaecati?</p>
        </div>
        <div class="contain">
            <div class="contactInfo">
                <div class="box">
                    <div class="icon">
                        <i class="fa fa-map-marker"></i>
                    </div>
                    <div class="text">
                        <h2>Address</h2>
                        <p>Lorem ipsum dolor sit amet<br/> Lorem, ipsum dolor.</p>
                    </div>
                </div>
                <div class="box">
                    <div class="icon"><i class="fa fa-phone"></i></div>
                    <div class="text">
                        <h2>Phone</h2>
                        <p>+91 9786656424</p>
                    </div>
                </div>
                <div class="box">
                    <div class="icon"><i class="fa fa-envelope-o"></i></div>
                    <div class="text">
                        <h2>Email</h2>
                        <p>chararity@gov.org.in</p>
                    </div>
                </div>
            </div>
        
        <div class="contactForm">
            <form>
                <h2>Send Message</h2>
                <div class="inputBox">
                    <input type="text" name="" required="required"/>
                    <span>Full Name</span>
                </div>
                <div class="inputBox">
                    <input type="email" name="" required="required"/>
                    <span>Email</span>
                </div>
                <div class="inputBox">
                    <textarea required="required"></textarea>
                    <span>Type your Message....</span>
                </div>
                <div class="inputBox">
                    <input type="submit" name="" value="Send"/>
                </div>
            </form>
        </div>  
        </div>  
    </section>
  )
}
