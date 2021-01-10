<template>
    <nav id="nav" class="navbar" role="navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/home.html">
	        <span class="is-size-5 has-text-primary-dark">Tasks</span>
            </a>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navBarItems">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navBarItems" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/home.html">Cycles</router-link>
                <router-link class="navbar-item" to="/new-cycle">New Cycle</router-link>

                <!--div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            About
                        </a>
                        <a class="navbar-item">
                            Jobs
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a>
                    </div>
                </div-->
            </div>

            <!--div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light">
                            Log in
                        </a>
                    </div>
                </div>
            </div-->
        </div>
    </nav>
    <router-view />
</template>
